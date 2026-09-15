const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { User } = require("./models/user");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if(!validateName(name, res)) return;
  if(!(await validateEmail(email, res))) return;
  if(!validatePassword(password, res)) return;

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  });
  await registerUser(newUser, res);
});

async function registerUser(userModel, res) {
  try {
    await userModel.save();
    res
      .status(201)
      .send({
        success: true,
        result: userModel,
        message: "Registration is successful",
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ success: false, message: err.message });
  }
}
function validateName(name, res) {
  if (name == null || name == undefined) {
    res
      .status(400)
      .send({ success: false, message: "Name is required" });
    return false;
  }

  if (name === "") {
    res
      .status(400)
      .send({ success: false, message: "Name cannot be empty" });
    return false;
  }
  return true;
}

async function validateEmail(email, res) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email == null || email == undefined) {
    res
      .status(400)
      .send({ success: false, message: "Email is required" });
    return false;
  }

  if (email === "") {
    res
      .status(400)
      .send({ success: false, message: "Email cannot be empty" });
    return false;
  }

  if (!emailRegex.test(email)) {
    res.status(400).send({ success: false, message: "Please provide a valid email address" });
    return false;
  }

  const existingStudentEmail = await getUser(email);
  if (existingStudentEmail) {
    res.status(409).send({
      success: false,
      message: "An account with this email already exists",
    });
    return false;
  }
  return true;
}

function validatePassword(password, res) {
  if (password == null || password == undefined) {
    res
      .status(400)
      .send({ success: false, message: "Password is required" });
    return false;
  }

  if (password === "") {
    res
      .status(400)
      .send({ success: false, message: "Password cannot be empty" });
    return false;
  }
  return true;
}

async function getUser(studentEmail) {
  return await User.findOne({ email: studentEmail });
}

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
