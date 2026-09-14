const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

function handleError(error) {
  console.log(error);
}

const handleMongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  } catch (err) {
    handleError(err.message);
  }
};
handleMongooseConnection();
