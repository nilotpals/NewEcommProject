const express = require("express");
const bcrypt = require("bcrypt");
const { DataView } = require("webidl-conversions");
const router = express.Router();
require("../config");
const UserModel = require('../model/user');
const {
    validateUserSignUp
  } = require('../validation/user');

router.use(express.json());
//const users = {fullname : "Nilotpal",email:"ndfg@fgh.com",password:"123456"};
router.post("/registration",validateUserSignUp, async (req,resp)=>{
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
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let data = new UserModel(req.body);
    const rest = await data.save();
    const result = {sucess:true,userdata:rest};
    resp.send(result);  
});

router.post("/login", async (req,resp)=>{
    try{
        var user = await UserModel.findOne({ email: req.body.email }).exec();
        if(!user) {
            return resp.status(400).send({ status:false,message: "The username does not exist" });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return resp.status(400).send({ status:false,message: "The password is invalid" });
        }
        resp.send({status:true, message: "The username and password combination is correct!" });
    } catch (error) {
        resp.status(500).send(error);
    }
});

module.exports = router;