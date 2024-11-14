require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./Database/Users");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/loginSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Registration Route
app.post("/new-user", async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      dateOfBirth,
      email,
      password: hashedPassword,
      normalPassword: password,
    });
    await user.save();
    const token = jwt.sign({ email: user.email }, "LoginSystem", {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "User already exists or invalid input" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, 'LoginSystem', {
        expiresIn: "1h",
      });
      res.json({ token, user });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to fetch users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name dateOfBirth email normalPassword ");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error: unable to fetch users" });
  }
});

app.listen(3032, () => console.log("Server running on port no. 3032"));
