const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
    try{
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: 'Why is the sky blue?',
    
  });
   console.log(response.text);
   
}catch(err){
  console.log(err.message);
  }
}

main();