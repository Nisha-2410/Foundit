import express from "express";
import { fetchFromGoogleCSE } from "../utils/google.js";
import { generateReason } from "./Reason.js"; // since Reason.js is inside /routes

const router = express.Router();

router.get("/google", async (req, res) => {
  const userQuery = req.query.q;
  if (!userQuery) {
    return res.status(400).json({ success: false, message: "Query is required" });
  }

  try {
    const googleResults = await fetchFromGoogleCSE(userQuery);

    const results = await Promise.all(
      googleResults.map(async (item) => {
        const reason = await generateReason(userQuery, item);
        return {
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          displayLink: item.displayLink,
          reason,
        };
      })
    );

    res.json({ success: true, results });
  } catch (err) {
    console.error("❌ Google Search Error:", err.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
