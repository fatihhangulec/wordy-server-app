import { GoogleGenerativeAI, HarmCategory,
    HarmBlockThreshold, } from "@google/generative-ai";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 4545

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "now im starting a game. I will give you a word and you will give me a sentences with this word. this game has some rules :\n1. all sentences will be english\n2. Sentences must be middle level not complex.\n3. all sentences will have turkish translate like this Turkish : \"sentence\".\n4. all time you will give one sentence.\n5. Dont tell anything except sentence. only create sentence."
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

app.post("/yapay-zeka", async (req,res) => {

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
              role: "user",
              parts: [
                {text: "cat"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "The cat sat on the mat. Turkish: Kedi paspasın üzerinde oturdu. \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "desk"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "The book is on the desk. Turkish: Kitap masanın üzerindedir."},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "bargain"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "She managed to get a good bargain at the market. Turkish: Pazarda iyi bir pazarlık yapmayı başardı. \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "console"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "{\"english\": \"The video game console was a popular gift this year.\", \"turkish\": \"Video oyun konsolu bu yıl popüler bir hediye oldu.\"}\n\n"},
              ]
            }
        ],
    });

    const result = await chat.sendMessage(req.body.prompt);
    const text = result.response.text();
    // console.log(text);
    res.json({text});
    const turkish = JSON.parse(text).turkish
    const english = JSON.parse(text).english
    console.log(`Türkçesi: ${turkish}\nİngilizcesi: ${english}`)
})

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`)
})

