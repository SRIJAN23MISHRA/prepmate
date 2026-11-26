function validateCards(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("AI did not return a list of flashcards");
  }

  const allGood = cards.every((c) => typeof c.question === "string" &&
    c.question.trim() !== "" &&
    typeof c.answer === "string" &&
    c.answer.trim() !== "");

  if (!allGood) {
    throw new Error("Some flashcards are missing a question or an answer");
  }
}
const tests = [
  '[]',
  '{"a":1}',
  '[{"question":"Q only"}]',
  '[{"question":"Q","answer":"   "}]',
  '[{"question":"Q","answer":"A"}]',
];

for (const t of tests) {
  try {
    validateCards(JSON.parse(t));
    console.log(t, "-> OK");
  } catch (err) {
    console.log(t, "->", err.message);
  }
}