// generateReason.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});

export async function generateReason(userQuery, item, intentCategory = "") {
const prompt = `
You are a fashion-savvy, emotionally intelligent shopping assistant.

The user searched: "${userQuery}"
Intended category: "${intentCategory}"

Product:
- Title: ${item.title}
- Description: ${item.description || "No description"}
- Price: ₹${item.price || "Unknown"}

Your job:
- Understand the mood or aesthetic behind the user's query (e.g. glam, daily wear, soft girl, budget matte, bold red).
- Check if the product fits the vibe and price expectation.
- If it's a **match**, reply with ONE short stylish line (max 20 words) mentioning:
  - Mood/aesthetic
  - Standout feature
  - Price vibe (e.g. budget find, luxe buy, everyday essential)

- If it's **not a direct match**, respond with:
  - A kind nudge why it may not fully fit
  - A clever suggestion where or how it *might still work* (e.g. layering, occasion, pairing)

Keep tone playful, smart, and honest — like a fashionable best friend.  
Return **only** the final sentence. No intro, no bullets, no markdown.
`;



  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a witty but concise shopping assistant who gives accurate, honest suggestions." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    });
console.log("AI Response:", res.choices[0].message.content);
    return res.choices[0].message.content.trim();
  } catch (err) {
    console.warn("⚠️ Reason generation failed:", err.message);
     console.error("Full error object:", err);
    return "AI reason unavailable";
  }
}

