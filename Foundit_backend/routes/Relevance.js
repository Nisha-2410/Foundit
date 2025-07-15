// RelevanceScore.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function scoreRelevance(userQuery, intentCategory, product, expectedPriceRange = "", features = []) {
  const prompt = `
You're an expert shopping assistant. Evaluate how well the following product matches the user's intent and return a JSON in this format:
{
  "score": number (0-10),
  "categoryMatch": number (0-3),
  "priceMatch": number (0-3),
  "featureMatch": number (0-4),
  "reason": "short explanation of the score"
}

User query: "${userQuery}"
Expected category: "${intentCategory}"
Expected price range: ₹${expectedPriceRange || "Not specified"}
Key intent keywords: ${features.length > 0 ? features.join(", ") : "None"}

Product Title: ${product.title}
Price: ₹${product.price || "Unknown"}
Description: ${product.description || "No description"}

Return ONLY the JSON.
  `;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const jsonText = res.choices[0].message.content.trim();

    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (err) {
    console.warn("⚠️ Relevance scoring failed or JSON parse error:", err.message);
    return {
      score: 0,
      categoryMatch: 0,
      priceMatch: 0,
      featureMatch: 0,
      reason: "Error in scoring or model response",
    };
  }
}
