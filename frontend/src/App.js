import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const API_URL = "http://localhost:5000/api/bfhl";  // Using bfhl as required

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      if (!jsonInput.data || !Array.isArray(jsonInput.data)) throw new Error("Invalid JSON format");

      const { data } = await axios.post(API_URL, jsonInput);
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON Input");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON: { "data": ["M","1","334","4","B"] }'
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "60%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#0056b3",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {response && (
        <div style={{ marginTop: "20px", textAlign: "left", width: "60%", margin: "auto" }}>
          <h2>Multi Filter</h2>
          <Select options={options} isMulti onChange={setSelectedOptions} />

          <div style={{ marginTop: "10px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
            <h3>Filtered Response</h3>
            {selectedOptions.map((opt) => (
              <p key={opt.value}>
                <strong>{opt.label}:</strong> {response[opt.value]?.join(", ")}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
