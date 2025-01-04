import { GoogleGenerativeAI } from "@google/generative-ai";

class Gemini {
  constructor() {
    this._genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    this._model = this._genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }

  async generateConceptNote(data) {
    const content = await this._model.generateContent({
      systemInstruction:
        "you are proffesional proposals writer working in Sudan",
      contents: [
        {
          role: "model",
          parts: [
            {
              text: "based on user input write a concept note that only have the following sections: Introduction (Context), The Problem, General Goals, Practical Objectives, Target Audience, Expected Outcomes",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `${data}`,
            },
          ],
        },
      ],

      generationConfig: {
        responseMimeType: "text/plain",
        temperature: 0.5,
      },
    });

    return content.response.text();
  }
}

const ai = new Gemini();

export default ai;

/* const note = await ai.generateConceptNote(
  "Sudanese women face increasing violations and lack effective advocacy tools during armed conflicts, leaving them vulnerable to violence and exclusion from peace processes."
);

console.log(note); */
