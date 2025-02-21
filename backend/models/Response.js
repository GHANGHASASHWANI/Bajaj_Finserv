const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    numbers: { type: [Number], default: [] },
    alphabets: { type: [String], default: [] },
    highestAlphabet: { type: String, default: null },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
