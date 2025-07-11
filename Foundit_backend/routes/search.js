import express from "express";
import {
  getIntentFromQuery,
  fetchProductsFromSerpAPI,
  filterProducts
} from "./Product.js";

import { generateReason } from "./Reason.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const userQuery = req.query.q;
  if (!userQuery) {
    return res.status(400).json({ success: false, message: "Query is required" });
  }

  let intent;
  try {
    intent = await getIntentFromQuery(userQuery);
    console.log("🟢 Parsed intent:", intent);
  } catch (err) {
    console.warn("⚠️ Intent fallback:", err.message);
    intent = { category: userQuery, max_price: null, keywords: [], must_have: [], avoid: [] };
  }

  let products = [];
  try {
    products = await fetchProductsFromSerpAPI(intent.category);
    console.log("🟡 Products fetched:", products.length);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Search failed" });
  }
  const limit = parseInt(req.query.limit) || 12;
  const filtered = filterProducts(products, intent);
const topPicks = (filtered.length ? filtered : products).slice(0, limit);

  const results = await Promise.all(
    topPicks.map(async item => {
      const reason = await generateReason(userQuery, item);
      return {
        title: item.title,
        price: item.price,
        imageUrl: item.thumbnail || item.source?.image,
        link: item.link,
        reason
      };
    })
  );

  res.json({ success: true, results });
});

export default router;
