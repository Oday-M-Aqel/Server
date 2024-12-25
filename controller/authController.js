const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_Key = process.env.secret_Key;

function Aha() {}

module.exports.signup = async (req, res) => {
  try {
    const {
      f_name,
      m_name,
      l_name,
      email,
      password,
      user_id,
      phone,
      city,
      gender,
      a_Terms_Condition,
    } = req.body;
    console.log(req.body);
    if (a_Terms_Condition !== true) {
      return res.status(403).json({
        message: "You must accept the terms and conditions to register",
      });
    }
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    const userObject = {
      first_name: f_name,
      middle_name: m_name,
      last_name: l_name,
      email: email,
      password: password,
      person_id: user_id,
      phone: phone,
      city: city,
      gender: gender,
      acceptTermsAndConditions: a_Terms_Condition,
    };
    console.log(userObject);
    // Check if the user has accepted terms and conditions in the database
    const newUser = await User.create(userObject);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Email or password isn't correct" });
    }
    const tokenData = {
      userId: userFound._id,
      role: userFound.role,
    };
    const Token = jwt.sign(tokenData, secret_Key);

    res.cookie("token", Token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      Token,
      userRole: userFound.role,
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + err.message });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 0,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
