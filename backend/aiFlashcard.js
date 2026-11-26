const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
const note=   "A process is a program in execution with its own memory space. A thread is a smaller unit of execution inside a process, and threads of the same process share its memory. Threads are cheaper to create and switch between than processes, but a bug in one thread can crash the whole process."

async function main() {
    console.log("1:main started");
    
    try{
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Generate exactly 5 flashcards from the note below. Your output must be a valid JSON array of objects only. Each object must have only the keys "question" and "answer". Do not include markdown code fences, explanations, or any extra text.

Note: ${note}`,
config: {
                responseMimeType: "application/json",
                thinkingConfig: {
        thinkingBudget: 0 // Disables extended thinking for near-instant responses
    }
            }
    
  });
   console.log("2: got a response");
  //  const rawText=response.text;
  const rawText='{"a":1}';
    const cards = JSON.parse(rawText);
    validateCards(cards);

        console.log(`Total cards: ${cards.length}`);
        console.log(`First card question: ${cards[0].question}`);
        console.log(`First card answer: ${cards[0].answer}`);
}
  
  catch(err){
  console.log("3: error:",err.message);
  }
}

main();