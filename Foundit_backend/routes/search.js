import express from "express";
import axios from "axios";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.get("/", async (req, res) => {
  const userQuery = req.query.q;
  if (!userQuery) {
    return res.status(400).json({ success: false, message: "Query is required" });
  }

  // STEP 1: Extract intent
  let intent = {
    category: userQuery,
    max_price: null,
    keywords: [],
    must_have: [],
    avoid: [],
  };

  try {
    const intentPrompt = `Extract structured shopping intent from this query:\n"${userQuery}"\n\nRespond ONLY in this JSON format:\n{\n  "category": "string",\n  "max_price": number | null,\n  "keywords": ["..."],\n  "must_have": ["..."],\n  "avoid": ["..."]\n}`;

    const intentRes = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: intentPrompt }],
      temperature: 0.3,
    });

    const content = intentRes.choices[0].message.content.trim();
    const jsonStart = content.indexOf("{");
    intent = JSON.parse(content.slice(jsonStart));

    console.log("🟢 Parsed intent:", intent);
  } catch (err) {
    console.warn("⚠️ Using fallback intent due to parsing failure:", err.message);
  }

  // STEP 2: Get products from SerpAPI
  let products = [];
  try {
    const serpRes = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_shopping",
        q: intent.category,
        api_key: process.env.SERPAPI_KEY,
      },
    });

    products = serpRes.data.shopping_results || [];
    console.log("🟡 Raw SerpAPI product count:", products.length);
  } catch (err) {
    console.error("🛑 SerpAPI error:", err.message);
    return res.status(500).json({ success: false, message: "Product search failed" });
  }

  // STEP 3: Light filtering
  const filtered = products.filter(p => {
    const title = p.title?.toLowerCase() || "";
    const desc = p.description?.toLowerCase() || "";

    const matchesPrice = !intent.max_price ||
      parseFloat(p.price?.replace(/[^0-9.]/g, "") || "999999") <= intent.max_price;

    const matchesKeywords = !intent.keywords.length ||
      intent.keywords.some(k => title.includes(k.toLowerCase()) || desc.includes(k.toLowerCase()));

    const matchesMustHave = !intent.must_have.length ||
      intent.must_have.every(must =>
        must.split(" ").some(word => desc.includes(word.toLowerCase()))
      );

    return matchesPrice && matchesKeywords && matchesMustHave;
  });

  console.log(`🔵 Final products after filtering: ${filtered.length}`);

 // STEP 4: AI reason generation (batched)
const selectedProducts = filtered.length ? filtered : products;

const numberedList = selectedProducts
  .map((item, i) => `${i + 1}. ${item.title}`)
  .join("\n");

const batchedPrompt = `
You are a smart shopping assistant.

A user searched: "${userQuery}"

Below is a list of product titles. Give one short, catchy reason (max 20 words) why someone should buy each product. Format your answer as a numbered list.

${numberedList}
`;

let reasonLines = [];

try {
  const batchedRes = await openai.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: "You are a persuasive shopping assistant." },
      { role: "user", content: batchedPrompt },
    ],
    temperature: 0.7,
  });

  const content = batchedRes.choices[0].message.content.trim();
  reasonLines = content
    .split("\n")
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);

  console.log("🟢 Groq batched response:", reasonLines);
} catch (err) {
  console.warn("⚠️ Batched reason generation failed:", err.message);
}

// Final product formatting
const results = selectedProducts.map((item, i) => {
  const reason = reasonLines[i] || "AI reason unavailable";

  const featureLine =
    item.extensions?.join(" • ") ||
    item.description?.split(",").slice(0, 3).join(" • ") ||
    "Key specs available";

  return {
    title: item.title,
    price: item.price,
    imageUrl: item.thumbnail || item.source?.image,
    link: item.link,
    formatted: `🎧 ${item.title} – ${item.price}\n🟢 ${featureLine}\n\n"${reason}"`,
    reason,
  };
});


  // STEP 5: Sponsored suggestion (optional)
  if (intent.max_price && intent.max_price >= 4500 && intent.max_price < 6500) {
    results.push({
      title: "JBL Live 660NC",
      price: "₹6,299",
      imageUrl: "https://example.com/jbl.jpg",
      link: "https://www.amazon.in/dp/B08XYZ123", // replace with real or affiliate
      formatted: `🔰 JBL Live 660NC – ₹6,299 (Ad)\n\nPremium ANC pick. Slightly over budget but great value if you're flexible.`,
      sponsored: true,
    });
  }

  res.json({ success: true, results });
});

export default router;
