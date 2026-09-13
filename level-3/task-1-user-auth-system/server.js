const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
