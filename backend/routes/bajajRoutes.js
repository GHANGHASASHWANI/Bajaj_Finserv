const express = require("express");

const router = express.Router();

router.post("/bfhl", (req, res) => {
  try {
    if (!req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const inputArray = req.body.data;

    const numbers = inputArray.filter(item => /^[0-9]+$/.test(item)).map(Number);
    const alphabets = inputArray
      .filter(item => /^[a-zA-Z]$/.test(item))
      .map(char => char.toUpperCase());

    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    res.json({
      is_success: true,
      user_id: "ashwani_22082004",
      email: "ghanghasashwani@gmail.com",
      roll_number: "22BCS16719",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

module.exports = router;
