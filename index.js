// Add Express
const express = require("express");

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Initialize server
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// Export the Express API for vercel
module.exports = app;
