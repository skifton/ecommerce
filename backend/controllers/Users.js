const Users = require("../models/Users.model.js");
const ShoppingSession = require("../models/ShoppingSession.model.js");
const bcrypt = require("bcrypt");
const uuid = require('uuid');
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  const { name, surname, email, password } = req.body;
  const confirmationCode = Math.floor(
    Math.random() * (1000000 - 100000) + 100000
  );
  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser)
    return res.status(500).json({ error: "This Email already exist." });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const user_id = uuid.v1();
  const session_id = uuid.v1();
  // try {
    await Users.create({
      id: user_id,
      name: name,
      surname: surname,
      email: email,
      password: hashPassword,
      confirmationCode: confirmationCode,
      role: "Admin"
    });
    await ShoppingSession.create({
      id: session_id,
      user_id,
      total: 0,
    })
    res.json({
      user_id,
      msg: "Registration Successful",
      email: email,
      confirmationCode: confirmationCode,
    });
  // } catch (error) {
  //   res.json(error);
  // }
};

const Login = async (req, res, next) => {
  // try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if(!user) return res.status(400).send({ error: "Incorrect email or password." });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send({ error: "Incorrect email or password." });
    const userId = user.id;
    const session = await ShoppingSession.findOne({ where: { user_id: userId } });
    const session_id = session.id
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign(
      { userId, name, email, role, session_id },
      process.env.ACCESS_TOKEN_SECRET,
      { 
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, role},
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: req.body.isRemember ? "1m" : "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      accessToken,
      refreshToken,
    });
    next();
  // } catch (error) {
  //   res.json({ error });
  // }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken)
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

const ConfirmEmail = async (req, res) => {
  const { confirmationCode, email } = req.body;
  const user = await Users.findOne({ where: { email: email } });
  if (user.confirmationCode === confirmationCode) {
    await Users.update({ status: "Active" }, { where: { id: user.id } });
    return res.status(200).json({ msg: "Your Email seccussfully confirmed!" });
  }
  return res.status(500).json({ error: "Incorrect confirmation code!" });
};

module.exports = { getUsers, Register, Login, Logout, ConfirmEmail };
