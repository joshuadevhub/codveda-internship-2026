const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddleware");
const adminAuth = require("./middlewares/adminAuth");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!validateName(name, res)) return;
  if (!(await validateEmail(email, res))) return;
  if (!validatePassword(password, res)) return;
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    // role,
    name: name,
    email: email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  await registerUser(newUser, res);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await getUser(email);
  if (existingUser === null) {
    res
      .status(401)
      .send({ success: false, message: "Invalid email or password" });
    return;
  }
  const userPassword = await comparePassword(password, existingUser);
  if (!userPassword) {
    res
      .status(401)
      .send({ success: false, message: "Invalid email or password" });
    return;
  }
  const payload = {
    userId: existingUser._id,
    email: existingUser.email,
    role: existingUser.role
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).send({ success: true, message: "User is logged in", token });
});

app.get("/get-auth", authMiddleware, adminAuth, (req, res) => {
  const { id, email, role } = req.data;
  res.status(200).send({success: true, message: "Admin Logged In"});
});

async function registerUser(userModel, res) {
  try {
    await userModel.save();
    res.status(201).send({
      success: true,
      result: userModel,
      message: "Registration is successful",
    });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
}
function validateName(name, res) {
  if (name == null || name == undefined) {
    res.status(400).send({ success: false, message: "Name is required" });
    return false;
  }

  if (name === "") {
    res.status(400).send({ success: false, message: "Name cannot be empty" });
    return false;
  }

  if (name.length < 3) {
    res
      .status(400)
      .send({
        success: false,
        message: "Name should contain at least 3 characters",
      });
    return false;
  }
  return true;
}

async function validateEmail(email, res) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email == null || email == undefined) {
    res.status(400).send({ success: false, message: "Email is required" });
    return false;
  }

  if (email === "") {
    res.status(400).send({ success: false, message: "Email cannot be empty" });
    return false;
  }

  if (!emailRegex.test(email)) {
    res
      .status(400)
      .send({
        success: false,
        message: "Please provide a valid email address",
      });
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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  if (password == null || password == undefined) {
    res.status(400).send({ success: false, message: "Password is required" });
    return false;
  }

  if (password === "") {
    res
      .status(400)
      .send({ success: false, message: "Password cannot be empty" });
    return false;
  }

  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .send({
        success: false,
        message:
          "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    return false;
  }
  return true;
}

async function getUser(studentEmail) {
  return await User.findOne({ email: studentEmail });
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, userObj) {
  const isMatch = await bcrypt.compare(password, userObj.password);
  return isMatch;
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
