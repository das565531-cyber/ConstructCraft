export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `You are a construction expert assistant for an Indian construction management website. Give helpful, practical, beginner-friendly answers. User question: ${question}`,
      }),
    });

    const data = await response.json();

    const answer =
      data.output?.[0]?.content?.[0]?.text ||
      "I could not generate an AI response right now.";

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({
      answer: "AI service is currently unavailable. Please try again later.",
    });
  }
}