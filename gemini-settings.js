const history = [
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
]

const systemInstruction = "now im starting a game. I will give you a word and you will give me a sentences with this word. this game has some rules :\n1. all sentences will be english\n2. Sentences must be middle level not complex.\n3. all sentences will have turkish translate like this Turkish : \"sentence\".\n4. all time you will give one sentence.\n5. Dont tell anything except sentence. only create sentence."

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export {history, systemInstruction, generationConfig};