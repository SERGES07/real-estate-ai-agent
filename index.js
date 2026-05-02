import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Test route
app.get("/", (req, res) => {
  res.send("AI Real Estate Agent is running 🚀");
});

// Chat route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an AI real estate assistant operating across Africa:
Nigeria, Kenya, Cameroon, Ivory Coast, Ghana, Tanzania, Egypt, South Africa.

Your role:
- Help users find properties
- Ask questions (budget, city, rooms)
- Suggest realistic options
- Act like a professional real estate agent
`
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
