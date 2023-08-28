const express = require("express");
const { signin, register } = require("./userController");
const userRouter = express.Router();

userRouter.post("/register" , register);

userRouter.post("/signin", signin);
module.exports = userRouter;