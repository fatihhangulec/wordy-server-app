import { 
    GoogleGenerativeAI, 
    HarmCategory, 
    HarmBlockThreshold, 

} from "@google/generative-ai";

import express from "express"

import cors from "cors"

import dotenv from "dotenv"

import {
    history, 
    systemInstruction,
    generationConfig
    
} from "./gemini-settings.js"

dotenv.config()

const PORT = process.env.PORT || 4545

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction
});

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
        history,
    });

    const result = await chat.sendMessage(req.body.prompt);
    const text = result.response.text();
    res.json({text});
    const turkish = JSON.parse(text).turkish
    const english = JSON.parse(text).english
    console.log(`Türkçesi: ${turkish}\nİngilizcesi: ${english}`)
})

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`)
})

