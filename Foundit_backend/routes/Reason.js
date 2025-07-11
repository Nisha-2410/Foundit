// generateReason.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateReason(userQuery, item, intentCategory = "") {
const prompt = `
You are a fashion-forward, emotionally intelligent shopping assistant.

The user searched for: "${userQuery}"
They are likely looking for something in the category: "${intentCategory}"

Here is one product:
- Title: ${item.title}
- Description: ${item.description || "No description"}

Your job is to:
- Understand the vibe or intention behind the user’s search (e.g. glam party look, everyday wear, soft girl aesthetic, budget glam, formal matte, bold red lips, no-makeup look, etc.)
- Compare it with the product title and description.
- Judge if this product fits that emotional/functional vibe.
- If YES: write a short, friendly 1–2 line reason why this product matches the user’s vibe and intent. Mention mood, style, standout features (e.g. long-lasting, shade variety, minimalist, nourishing, bold, luxurious, subtle, etc).
- If NOT: politely explain why it’s not a good fit, and suggest skipping it.

Be witty, kind, and helpful. Your tone should feel like a best friend giving good beauty advice. Respond ONLY with your answer, no extra formatting.`;


  try {
    const res = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are a witty but concise shopping assistant who gives accurate, honest suggestions." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    });

    return res.choices[0].message.content.trim();
  } catch (err) {
    console.warn("⚠️ Reason generation failed:", err.message);
    return "AI reason unavailable";
  }
}

