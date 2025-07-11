// productSearch.js
import axios from "axios";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import { scoreRelevance } from "./Relevance.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// 🧠 STEP 1: Extract shopping intent using LLM
export async function getIntentFromQuery(userQuery) {
  const prompt = `Extract structured shopping intent from this query:\n"${userQuery}"\n\nRespond ONLY in this JSON format:\n{
  "category": "string",
  "max_price": number | null,
  "keywords": ["..."],
  "must_have": ["..."],
  "avoid": ["..."]
}`;
  const res = await openai.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  let content = "";
  try {
    const firstChoice = res?.choices?.[0];
    if (!firstChoice || !firstChoice.message?.content) {
      throw new Error("LLM response missing expected content");
    }
    content = firstChoice.message.content.trim();
  } catch (err) {
    console.error("❌ Error extracting LLM response content:", err.message);
    console.log("🧠 Full raw response:", JSON.stringify(res, null, 2));
    throw err;
  }

  const jsonStart = content.indexOf("{");
  const parsed = JSON.parse(content.slice(jsonStart));

  // Fallbacks if LLM messes up
  if (!parsed.category) parsed.category = userQuery;
  if (!parsed.keywords) parsed.keywords = [];
  if (!parsed.must_have) parsed.must_have = [];
  if (!parsed.avoid) parsed.avoid = [];

  return parsed;
}

// 🛍️ STEP 2: Fetch & clean products using SerpAPI
export async function fetchProductsFromSerpAPI(query) {
  try {
   const serpRes = await axios.get("https://serpapi.com/search", {
  params: {
    engine: "google_shopping",
    q: query,
    api_key: process.env.SERPAPI_KEY,
    gl: "in",         // geo-location India
    hl: "en",         // English
    google_domain: "google.co.in", // force Indian shopping
    product_condition: "new",      // ignore old/used/refurb
    num: 20           // fetch more for better filtering
  },
});

    

    const rawResults = serpRes.data.shopping_results || [];

    return rawResults.map(item => ({
      title: item.title,
      price: item.price,
      link: item.link,
      thumbnail: item.thumbnail,
      description: item.description || "",
      source: item.source || "",
      extensions: item.extensions || [],
    }));
  } catch (err) {
    console.error("❌ SerpAPI fetch error:", err.message);
    return [];
  }
}

// 🧹 STEP 3: Smart filtering (with category match)
// 🧠 Intelligent, flexible scoring-based product filter


export async function filterProducts(products, intent, userQuery) {
  const scoredProducts = await Promise.all(
    products.map(async (product) => {
      const relevance = await scoreRelevance(userQuery, intent.category, product);
      return { ...product, relevance };
    })
  );

  const threshold = 6.5; // 🧪 adjust based on results
  return scoredProducts
    .filter(p => p.relevance >= threshold)
    .sort((a, b) => b.relevance - a.relevance);
}

