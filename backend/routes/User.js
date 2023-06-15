const express = require("express");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtkey = "Nilotpal";
const router = express.Router();
require("../config");
const UserModel = require("../model/user");
const { body, validationResult } = require("express-validator");
/* const {
    validateUserSignUp
  } = require('../validation/user'); */

router.use(express.json());
//const users = {fullname : "Nilotpal",email:"ndfg@fgh.com",password:"123456"};
router.post(
  "/registration",
  [
    body("fullname", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter password").not().isEmpty(),
    body("password", "Password should be minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    /*    const {fullname,email,password} = req.body;
    var pass1 = "Password";
    const hash = await bcrypt.hash(pass1,8); */
    /*     users.push({
        fullname,
        email,
        password: hash
    }); 
    const obj1 = Object.assign({},users);
    console.log(obj1); */
    //    let data = new User({fullname,email,hash});
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      let data = new UserModel(req.body);
      const result = await data.save();
      Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.status(400).send("Something went wrong");
        }
        resp.status(200).send({result, auth: token });
      });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please enter password").not().isEmpty(),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    } else {
      try {
        var user = await UserModel.findOne({ email: req.body.email }).exec();
        if (!user) {
          return resp
            .status(400)
            .send({ status: false, message: "The username does not exist" });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return resp
            .status(400)
            .send({ status: false, message: "The password is invalid" });
        }
        Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            resp.status(400).send("Something went wrong");
          }
          resp.status(200).send({user, auth: token });
        });
        
      } catch (error) {
        resp.status(500).send(error);
      }
    }
  }
);

module.exports = router;
