const userModel = require("./user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "illuminati3187"

//SIGNUP
const register = async (req , res) => {

    const {name , email} = req.body;
    try{
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedName = await bcrypt.hash(name , 10);

        const result = await userModel.create({
            name: hashedName,
            email:email
        });

        const token = jwt.sign({email : result.email, id : result._id} , SECRET_KEY);
        res.status(201).json({user: result, token: token , message : "User Created Successfully"});
    }

    catch (error) {
        console.log(error);
        res.status(500).json({mssage: "Something went wrong"})
    }
}
  
//LOGGING IN
const signin = async (req , res) => {
    const {name , email} = req.body;

    try {

        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchName = await bcrypt.compare(name , existingUser.name);
        if(!matchName){
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const token = jwt.sign({email : existingUser.email, id : existingUser._id} , SECRET_KEY);
        res.status(201).json({user: existingUser, token: token , message : "Succesfully logged in"});

    }
    
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = { register , signin };