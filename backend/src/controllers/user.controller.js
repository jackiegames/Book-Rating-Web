import { User } from "../models/user.model.js"

const registerUser = async (req, res) =>{
    try{
        const { username, email, password } = req.body;
        // Basic Validation

        if (!username || !email || !password){
            return res.status(400).json({ message: "All fields are required!"});
        }

        //check if user exists in the system
        const existing = await User.findOne({ email: email.toLowerCase()}); // check the user database for any users with the same email
        if(existing){
            return res.status(400).json({ message: "User already exists"});
        }

        // create user, small "u" means one user but "U" means the whole user model
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            // loggedIn: false,
        });

        console.log("User successfully saved:", user._id);
        
        res.status(201).json({ 
            message: "User registration is successful",
            user: { 
                _id: user._id, 
                email: user.email, 
                username: user.username
            
            }

        });
    } catch (error){
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try{

        // checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        // if the user doesn't exist
        if(!user) return res.status(400).json({
            message: "User not found"
        });

        // compare the passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "Successfully logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout Successful"
        })
    } catch (error){
        res.status(500).json({
            message:"Internal Server Error", error
        });
    }
}

export{
    registerUser,
    loginUser,
    logoutUser
};