const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConstructCraft API Running 🚀",
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});