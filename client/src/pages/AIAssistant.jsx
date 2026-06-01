import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("General");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I am ConstructCraft AI. Choose a tool like Cost Planner, Material Advisor, Budget Optimizer, Timeline Planner, or ask any construction question.",
    },
  ]);

  const tools = [
    {
      name: "General",
      icon: "🤖",
      prompt: "Ask any construction question",
    },
    {
      name: "Cost Planner",
      icon: "💰",
      prompt: "Estimate cost for 1200 sq ft house in Kolkata",
    },
    {
      name: "Material Advisor",
      icon: "🧱",
      prompt: "Suggest materials for residential house construction",
    },
    {
      name: "Budget Optimizer",
      icon: "📉",
      prompt: "How can I reduce construction cost without losing quality?",
    },
    {
      name: "Timeline Planner",
      icon: "📅",
      prompt: "Create a construction timeline for a 2 floor house",
    },
    {
      name: "Builder Advisor",
      icon: "🏗️",
      prompt: "How should I choose a trusted builder?",
    },
  ];

  const generateAnswer = (text) => {
    const q = text.toLowerCase();

    if (mode === "Cost Planner" || q.includes("cost") || q.includes("estimate") || q.includes("budget")) {
      return `🏗️ Construction Cost Estimate

For Kolkata construction, estimated cost depends on quality:

• Economy: ₹1,600/sq ft
• Standard: ₹2,200/sq ft
• Premium: ₹3,200/sq ft
• Luxury: ₹4,500+/sq ft

Example for 1200 sq ft:
• Economy: ₹19.2 lakh
• Standard: ₹26.4 lakh
• Premium: ₹38.4 lakh

Approx budget split:
• Materials: 55%
• Labour: 28%
• Finishing: 12%
• Miscellaneous: 5%

Tip: Use the Calculator page for exact area-based estimation.`;
    }

    if (mode === "Material Advisor" || q.includes("material") || q.includes("cement") || q.includes("steel") || q.includes("brick")) {
      return `🧱 Material Recommendation

For residential construction:

Cement:
• OPC 53 Grade for RCC/structure
• PPC for plastering and durability

Steel:
• TMT Fe500D recommended
• Always use ISI-marked steel

Bricks:
• Fly ash bricks: lightweight and eco-friendly
• Red clay bricks: traditional and widely available

Sand:
• River sand for plastering
• M-sand for concrete and masonry

Paint:
• Exterior: weather-resistant acrylic paint
• Interior: washable emulsion paint`;
    }

    if (mode === "Budget Optimizer" || q.includes("reduce") || q.includes("save") || q.includes("cheap")) {
      return `📉 Cost Saving Plan

Ways to reduce construction cost:

1. Finalize design before starting work
2. Buy materials in bulk
3. Compare 3–4 suppliers
4. Avoid frequent design changes
5. Use standard-size doors/windows
6. Choose vitrified tiles instead of expensive marble
7. Use fly ash bricks where suitable
8. Track material wastage
9. Hire builder with clear written quotation
10. Use ConstructCraft calculator before purchase

Avoid reducing quality in:
• Cement
• Steel
• Foundation
• Waterproofing
• Electrical safety`;
    }

    if (mode === "Timeline Planner" || q.includes("timeline") || q.includes("time") || q.includes("duration")) {
      return `📅 Construction Timeline

Typical 2-floor residential house timeline:

Week 1–2:
• Planning, design, permissions

Week 3–5:
• Foundation work

Week 6–10:
• Column, beam, slab structure

Week 11–14:
• Brickwork and walls

Week 15–18:
• Electrical and plumbing

Week 19–22:
• Plastering and waterproofing

Week 23–28:
• Flooring, painting, doors, windows

Total expected time:
• Small house: 6–8 months
• Medium house: 8–12 months

Delay reasons:
• Rain
• Material shortage
• Labour issues
• Design changes`;
    }

    if (mode === "Builder Advisor" || q.includes("builder") || q.includes("contractor")) {
      return `🏗️ Builder Selection Guide

Before hiring a builder, check:

• Experience
• Completed projects
• Customer reviews
• Work quality
• Labour team strength
• Payment terms
• Timeline commitment
• Material quality
• Written agreement
• Warranty/after-service

Ask these questions:
1. How many similar projects have you completed?
2. What materials will you use?
3. Is labour cost included?
4. What is the payment schedule?
5. What happens if the project is delayed?

Never start without a written quotation.`;
    }

    if (q.includes("foundation")) {
      return `🏠 Foundation Advice

Foundation depends on:
• Soil type
• Building load
• Number of floors
• Water table
• Location

Important:
• Do soil testing before construction
• Never compromise on foundation
• Use proper cement and steel
• Ensure correct curing
• Waterproof basement/foundation areas if needed`;
    }

    if (q.includes("waterproof")) {
      return `💧 Waterproofing Advice

Use waterproofing for:
• Terrace
• Bathroom
• Roof
• Basement
• Balcony
• External walls

Best options:
• Polymer coating
• Liquid membrane
• Cementitious waterproofing

Do waterproofing before tiles and finishing work. Poor waterproofing causes leakage, cracks and expensive repairs.`;
    }

    if (q.includes("electrical") || q.includes("wire")) {
      return `⚡ Electrical Planning

Use:
• ISI-certified copper wires
• Proper MCBs
• RCCB/ELCB for safety
• Good quality switches
• Proper earthing

Plan points for:
• Fans
• Lights
• AC
• Geyser
• Kitchen appliances
• Inverter
• WiFi/CCTV

Electrical planning should be done before plastering.`;
    }

    return `I can help you with:

• Construction cost estimate
• Cement and steel selection
• Brick and sand guidance
• Foundation planning
• Waterproofing
• Builder selection
• Budget saving
• Construction timeline
• Electrical and plumbing planning

Try using one of the AI tools above for a better answer.`;
  };

  const askAI = () => {
    if (!question.trim()) return;

    const userText = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setQuestion("");
    setLoading(true);

    setTimeout(() => {
      const answer = generateAnswer(userText);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: answer,
        },
      ]);

      setLoading(false);
    }, 700);
  };

  const useTool = (tool) => {
    setMode(tool.name);
    setQuestion(tool.prompt);
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#60a5fa,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#172554)] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-blue-300 font-bold">
              🤖 Advanced Construction AI
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Your Smart
              <span className="text-orange-400"> Construction Consultant </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Get advanced guidance for cost planning, materials, builders,
              timelines, waterproofing, electrical planning and budget optimization.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">6</h2>
                <p className="text-gray-300">AI Tools</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">Smart</h2>
                <p className="text-gray-300">Advice</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">Fast</h2>
                <p className="text-gray-300">Planning</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/30 blur-3xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
              <h2 className="text-4xl font-extrabold mb-4">
                AI Tools
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => useTool(tool)}
                    className={`text-left p-4 rounded-xl border transition ${
                      mode === tool.name
                        ? "bg-orange-500 border-orange-500"
                        : "bg-black/30 border-white/10 hover:bg-white hover:text-black"
                    }`}
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <p className="font-bold">{tool.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="bg-orange-500 text-white p-5 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                ConstructCraft AI Chat
              </h2>

              <p className="text-white/80 text-sm">
                Current Mode: {mode}
              </p>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    sender: "ai",
                    text: "Chat cleared. Choose an AI tool or ask a construction question.",
                  },
                ])
              }
              className="bg-white text-orange-500 px-4 py-2 rounded-xl font-bold"
            >
              Clear
            </button>
          </div>

          <div className="h-[470px] overflow-y-auto p-6 space-y-4 bg-black/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-line p-5 rounded-2xl shadow-xl ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-white text-slate-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="bg-white text-slate-900 p-4 rounded-2xl shadow-xl w-fit">
                AI is analyzing your construction query...
              </div>
            )}
          </div>

          <div className="p-5 flex gap-3 bg-white/10 border-t border-white/10">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
              }}
              placeholder="Ask about cost, cement, steel, foundation, builder..."
              className="flex-1 bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              onClick={askAI}
              className="bg-orange-500 text-white px-8 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;