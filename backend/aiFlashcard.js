const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
const note=   "A process is a program in execution with its own memory space. A thread is a smaller unit of execution inside a process, and threads of the same process share its memory. Threads are cheaper to create and switch between than processes, but a bug in one thread can crash the whole process."
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function validateCards(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("AI did not return a list of flashcards");
  }

  const allGood = cards.every(
    (c) =>
      typeof c.question === "string" &&
      c.question.trim() !== "" &&
      typeof c.answer === "string" &&
      c.answer.trim() !== ""
  );

  if (!allGood) {
    throw new Error("Some flashcards are missing a question or an answer");
  }
}
async function generateCards(note) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Generate exactly 5 flashcards from the note below. Your output must be a valid JSON array of objects only. Each object must have only the keys "question" and "answer". Do not include markdown code fences, explanations, or any extra text.

Note: ${note} `,
        config: { responseMimeType: "application/json" },
      });
      const cards = JSON.parse(response.text);
      validateCards(cards);
      return cards;                       // success: leave the function
    } catch (err) {
      lastError = err;
      console.log(`attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) await sleep(2000); // wait 2 seconds, then try again
    }
  }

  throw lastError;                        // all 3 tries failed
}
async function main() {
  try {
    const cards = await generateCards(note);
    console.log(`Total cards: ${cards.length}`);
    console.log(`First card question: ${cards[0].question}`);
    console.log(`First card answer: ${cards[0].answer}`);
  } catch (err) {
    console.log("error:", err.message);
  }
}

main();