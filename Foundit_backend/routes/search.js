// routes.js or wherever this route is defined
import express from "express";
import {
  getIntentFromQuery,
  fetchProductsFromSerpAPI,
  filterProducts
} from "./Product.js";

import { generateReason } from "./Reason.js";
// import { scoreRelevance } from "./RelevanceScore.js"; // optional, only if you want relevance scoring

const router = express.Router();

router.get("/", async (req, res) => {
  const userQuery = req.query.q;
  if (!userQuery) {
    return res.status(400).json({ success: false, message: "Query is required" });
  }

  // Step 1: Parse Intent
  let intent;
  try {
    intent = await getIntentFromQuery(userQuery);
    console.log("🟢 Parsed intent:", intent);
  } catch (err) {
    console.warn("⚠️ Intent fallback:", err.message);
    intent = {
      category: userQuery,
      max_price: null,
      keywords: [],
      must_have: [],
      avoid: []
    };
  }

  // Step 2: Fetch Products
  let products = [];
  try {
    products = await fetchProductsFromSerpAPI(intent.category);
    console.log("🟡 Products fetched:", products.length);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Search failed" });
  }

  // Step 3: Filter and Slice
  const limit = parseInt(req.query.limit) || 12;
  const HARD_LIMIT = 10;
  const filtered = filterProducts(products, intent);
  const topPicks = (filtered.length ? filtered : products).slice(0, Math.min(limit, HARD_LIMIT));

  // Step 4: Generate reason (+ optional relevance score)
  const results = await Promise.all(
    topPicks.map(async (item) => {
      try {
        const reason = await generateReason(userQuery, item);

        // Optional: use scoreRelevance()
        // const relevance = await scoreRelevance(
        //   userQuery,
        //   intent.category,
        //   item,
        //   intent.max_price,
        //   intent.keywords
        // );

        return {
          title: item.title,
          price: item.price,
          imageUrl: item.thumbnail || item.source?.image || null,
          link: item.link,
          reason,
           description: item.description || "", 
          // score: relevance.score,
          // reasonDetails: relevance.reason
        };
      } catch (err) {
        console.warn("⚠️ AI failed for product:", item.title);
        return {
          title: item.title,
          price: item.price,
          imageUrl: item.thumbnail || item.source?.image || null,
          link: item.link,
          reason: "Couldn’t generate suggestion",
           description: item.description || "", 
        };
      }
    })
  );

  console.log("✅ Final results:", results.length);
  res.json({ success: true, results });
});

export default router;
