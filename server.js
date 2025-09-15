const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authModel = require("./models/auth");

const app = express();

const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.post("/register", (req, res) => {
  authModel
    .create(req.body)
    .then((auth) => res.json(auth))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  authModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          return res.json({ message: "Success", token });
        } else {
          return res.status(401).json({ message: "Incorrect Password" });
        }
      } else {
        return res.status(404).json({ message: "No records Found!" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
