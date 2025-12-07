import { GoogleGenAI } from "@google/genai";
import { PIPELINE_FUNNEL, RISK_SCORES, REPS, FORECAST_DATA } from '../constants';

const API_KEY = process.env.API_KEY || '';

// Initialize client safely
const getClient = () => {
  if (!API_KEY) {
    console.error("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateExecutiveSummary = async (): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  // Construct a context-rich prompt with our data
  const dataContext = JSON.stringify({
    pipeline: PIPELINE_FUNNEL,
    forecast: FORECAST_DATA,
    risk_entities: RISK_SCORES,
    rep_performance: REPS
  });

  const prompt = `
    You are a Senior Sales Operations Analyst at Wolters Kluwer. 
    Analyze the following JSON data representing our current Sales Pipeline, Forecast, Compliance Risks, and Rep Performance.
    
    Data Context: ${dataContext}

    Please provide a professional, concise Executive Summary (approx 150-200 words).
    Structure the response with HTML formatting (use <h3>, <ul>, <li>, <strong> tags).
    
    Focus on:
    1. Pipeline Health & Forecast Trends.
    2. Critical Compliance Risks (High risk scores).
    3. Performance gaps or highlights.
    4. One strategic recommendation.

    Do not include markdown code blocks, just return the HTML string.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time. Please try again later.";
  }
};