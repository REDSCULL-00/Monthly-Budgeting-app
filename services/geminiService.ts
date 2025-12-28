
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialInsights = async (transactions: Transaction[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const summary = transactions.map(t => 
    `${t.date}: ${t.type.toUpperCase()} - ${t.name} ($${t.amount})`
  ).join('\n');
  
  const prompt = `
    I am looking at my finances for this month. Based on the following list of income and expenses, please provide 3 brief, actionable financial tips or observations. 
    Compare my income vs my spending and offer advice on saving or budgeting better.
    Keep it encouraging, concise, and professional.
    
    Transactions:
    ${summary || "No transactions recorded yet."}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "I couldn't analyze your data right now, but keep tracking those transactions to build a healthy financial habit!";
  }
};
