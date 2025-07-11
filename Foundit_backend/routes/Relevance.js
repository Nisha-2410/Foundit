// RelevanceScore.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function scoreRelevance(userQuery, intentCategory, product) {
  const prompt = `
You're a smart shopping filter AI.

User query: "${userQuery}"
Intended category: "${intentCategory}"

Evaluate the relevance of the following product:

Title: ${product.title}
Description: ${product.description || "No description"}

On a scale of 0 to 10, how relevant is this product to the query and category?

Respond ONLY with a number between 0 and 10. No text.
`;

  try {
    const res = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
    });

    const score = parseFloat(res.choices[0].message.content.trim());
    return isNaN(score) ? 0 : score;
  } catch (err) {
    console.warn("⚠️ Relevance scoring failed:", err.message);
    return 0;
  }
}
