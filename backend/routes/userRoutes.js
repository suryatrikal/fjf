const express=require('express');
const { Register, login, loggOut, forgetPassword} = require('../controller/authenticationController');
const routes=express.Router();
routes.route("/Register").post(Register)
routes.route("/login").post(login)
routes.route('/loggOut').get(loggOut)
routes.route('/forget').post(forgetPassword)
module.exports=routes;
