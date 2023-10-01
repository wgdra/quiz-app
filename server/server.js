const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
env.config();

// PORT

const PORT = process.env.PORT;

// Midlewares

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  try {
    res.json("Get request");
  } catch (error) {
    res.json(error);
  }
});

// Log
app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});
