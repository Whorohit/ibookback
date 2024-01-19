const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/userauthication')
const tokenkey = "mynamrisrohit"

router.post('/api/auth', [
  body('name', 'name should be graeter than two character').isLength({ min: 2 }),
  body('email', 'enter the vaild email').isEmail(),
  body('password', 'enter the strong password').isLength({ min: 7 },)],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let usr = await User.findOne({ email: req.body.email })
      if (usr) {
        return res.status(400).json({ success, errors: "email id already Exists use differnent id" });
      }
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        password: pass,
        email: req.body.email,
      })
      const data = {
        user: {
          id: user.id
        }
      }
      success = true
      var token = await jwt.sign(data, tokenkey, {
        expiresIn: '2m'
      });
      res.json({ success, token, id: user.id })
      console.log(user)

    } catch (error) {
      res.status(500).send("techincal error")

    }
  })
router.post('/api/login', [
  body('email', 'enter the vaild email').isEmail(),
  body('password', 'password cannot be null ').exists()

],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    // try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success, errors: "enter with correct email and password" });

    }
    const pascomapre = await bcrypt.compare(password, user.password);
    if (!pascomapre) {
      return res.status(400).json({ success, errors: "enter with correct password email and password" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    var token = await jwt.sign(data, tokenkey, {
      expiresIn: '2m'
    });
    success = true
    res.status(200).json({ success, token, id: user._id })
    console.log(user, token)

    // } catch (error) {
    //   res.status(400).json({success,errors: "enter with correct no email and password" });

    // }
  })
router.get('/api/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password")
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router