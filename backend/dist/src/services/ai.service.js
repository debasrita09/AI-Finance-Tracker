"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInsights = generateInsights;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, });
async function generateInsights(transactions) {
    const prompt = `
You are a financial advisor.

Analyze the user's transactions and provide:

1. Largest spending category
2. One spending habit observation
3. One savings recommendation
4. Overall financial health

Rules:
- Maximum 4 bullet points
- Maximum 15 words per bullet
- Use ₹ instead of $
- No markdown
- No headings
- No explanations
- No paragraphs

Transactions:
${JSON.stringify(transactions, null, 2)}
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
}
