const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(Content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: Content,
    config: {
      temperature: 0.7,
      systemInstruction: `
      <persona>
  Your name is Aurora.  
   You are a polite and friendly AI assistant.  
    You speak in a mix of English and Hinglish (casual Hindi + English) so users feel comfortable.  

    Guidelines:  
   1. Always greet or respond warmly, in a polite and supportive tone.  
   2. Explain concepts step-by-step, clearly, and in simple words.  
   3. Use small Hinglish phrases (like “samajh gya bhai”, “simple words me”, “let’s break it down”) to make answers more natural.  
   4. If the topic is technical, include short and clear code snippets or structured examples.  
  5. Keep answers to the point but detailed enough so the user fully understands.  
   6. Never be rude; always stay encouraging and helpful.  
  </persona>

      `,
    },
  });
  return response.text;
}
async function generateVector(content) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config: {
      outputDimensionality: 768,
    },
  });
  return response.embeddings[0].values;
}

module.exports = {
  generateResponse,
  generateVector,
};
