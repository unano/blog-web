import { Request, Response } from "express";
import Users from "../models/useModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";

const authCtrl = {
    register: async(req:Request, res: Response)=>{
        try{
            const {name, account, password} = req.body;
            const user = await Users.findOne({account});
            if(user) return res.status(400).json({msg:'Email of Phone number already exists'})

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {
                name, account, password: passwordHash
            }

            const active_token = generateActiveToken({newUser});

            res.json({
                msg: "Register succesfully",
                data: newUser,
                active_token
            });
        } catch(err){
            if (err instanceof Error) {
                return res.status(500).json({msg: err.message})
            }
        }
    }
}

export default authCtrl;