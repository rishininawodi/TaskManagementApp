require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== SESSION MIDDLEWARE =====
app.use(
  session({
    secret: process.env.JWT_SECRET || "defaultsecret", // Set a secure secret in production
    resave: false,
    saveUninitialized: true,
  })
);

// ===== PASSPORT MIDDLEWARE =====
require("./config/passport"); // Ensure this file exports the passport configuration
app.use(passport.initialize());
app.use(passport.session());

// ===== CONNECT TO MONGODB =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== ROUTES =====
app.use("/api/tasks", require("./routes/tasks"));
app.use("/auth", require("./routes/auth"));

// ===== STATIC FILES (FOR REACT) =====
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
