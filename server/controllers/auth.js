import User from "../models/user.js"
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const register = async (req, res) => {
  try {
    // distructure
    const { name, email, password } = req.body;
    
    // validate
    if(!name.trim()) {
        return res.json({ error: "Name is required" });
    }
    if(!email) {
        return res.json({ error: "Email is required" })
    }
    if(!password || password.length < 8) {
        return res.json({ error: "Password must be at least 8 characters long" })
    }
    // check if email is taken
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.json ({ error: "Email is already taken" })
    }
    // hash password
    const hashedPassword = await hashPassword(password)
    const user = await new User({ 
        name, 
        email, 
        password: hashedPassword 
    }).save();
    // create token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    res.json({
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
        },
        token,
    });
  } catch (err) {
    console.log(err);
  }
};


export const login = async (req, res) => {
try {
    const { email, password } = req.body;
    if(!email) {
        return res.json({ error: "Email is required" })
    }
    if(!password || password.length < 8) {
        return res.json({ error: "Password must be at least 8 characters long" })
    }
    const user = await User.findOne({ email });
    if(!user) {
        return res.json({ error: "User not found" })
    }
    // compare password
    const match = await comparePassword(password, user.password);
    if(!match) {
        return res.json({ error: "Wrong password" })
    }
    // create token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({
       user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
       },
       token,
    });
} catch (err) {
   console.log(err); 
}

};


export const authCheck = async (req, res) => {
    try {
        res.json({ ok: true })
       
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const adminCheck = async (req, res) => {
    try {
       res.json({ ok: true }) 
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);  
    }
};


export const saveCart = async (req, res) => {
    try {
        const { cartItems } = req.body;

        const user = await User.findById(req.user._id)

        if (user) {
            user.cartItems = cartItems
            user.save()
            res.json({ message: "Cart saved" })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json("User not found")
    }
}

export const getCart = async(req, res) => {
    try {
        console.log("User", req.user._id);


        const user = await User.findById(req.user._id);
        if (user) {
            res.json(user.cartItems)
        }
    } catch (err) {
        console.log(err);
        res.status(400).json("User not found")
    }
}