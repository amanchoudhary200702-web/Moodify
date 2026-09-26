const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const authuser =  require("../middleware/auth.middleware.js")
const { redis } = require("../config/cache.js")
const jwt= require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model.js");
require("dotenv").config();



async function registeruser(req,res){
    const {username,email,password} = req.body
    if (!username || !email || !password) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
    const isalreadyregistered = await userModel.findOne({
        $or:[
        {email},
        {username}   
        ]
    })

    if(isalreadyregistered){
        return res.status(400).json({
            message:"user already exist with this username or email"
        })

    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })


     const token = jwt.sign({
        id:user._id,
        username:user.username,


     },process.env.JWT_SECRET,
     {
        expiresIn:"3d"
     }

    
    )

    res.cookie("token",token)

    return res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })

}

async function loginUser(req, res) {
    console.log("request")
    try {

        const { email, password } = req.body;

        // Check if fields are empty
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",
            }
        );

        // Send cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}


 async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user
    })

    
}

async function logoutUser(req,res){
    const token = req.cookies.token

    res.clearCookie(token)


     await redis.set(token, Date.now().toString(), "EX", 60 * 60)
    
    return res.status(200).json({
        message:"logout successfully"
    })
}

module.exports = {registeruser,loginUser,getMe,logoutUser}