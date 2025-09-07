const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

