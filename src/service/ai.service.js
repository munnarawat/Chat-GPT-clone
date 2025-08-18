const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(Content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: Content,
  });
  return response.text;
}

module.exports = {
    generateResponse
};