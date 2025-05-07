const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Assuming Task model is set up

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
