import express from 'express';
import passport from 'passport';
import { Request, Response } from 'express';
import sessionValidation from '../middleware/sessionValidation';
import userModel from '../models/users';
import { generatePassword } from '../lib/authUtils';

const authRoute = express.Router();

authRoute.post('/login', passport.authenticate('local'), async (request: Request, res: Response) => {
    const { email } = request.body
    const [ user ] = await userModel.find({ email })

    if (!user) {
        res.status(400).json({message: "User not found"})
    } else {
        res.status(200).json({message: "Welcome!"})
    }

})

authRoute.post('/signup', async (request: Request, response: Response) => {
    try {
        const { email } = request.body
        const foundUser = await userModel.findOne({email}) 
        console.log("user in signup - ", foundUser)
        if(foundUser) {
            response.status(400).json({message: "Email already exists."})
        } else {
            const { salt, hash } = generatePassword(request.body.password);
            const user = request.body;
            const newUserObject = new userModel({
                ...user,
                hash,
                salt
            });

            const newUser = await newUserObject.save();
            console.log("new user - ", newUser);
            response.status(204)
        }
        
    } catch (error) {
        response.status(500).json({message: "There was an error."})
    }

})


export default authRoute