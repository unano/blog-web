import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken, generateRefreshToken, generateAccessToken } from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/valid";
import { IDecodedToken, IUser, IReqAuth } from "../config/interface";
import mongoose from "mongoose";

const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user) return res.status(400).json({ msg: "Email already exists" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendMail(account, url, "Verify your email address");
        return res.json({ msg: "Success! Plese check your email" });
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ msg: err.message });
      }
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "invalid authentication" });

      const user = await Users.findOne({ account: newUser.account });
      if (user) return res.status(400).json({ msg: "Account already exists" });
      const new_user = new Users(newUser);
      await new_user.save();
      res.json({ msg: "Account has been activated!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      console.log(account, password)

      let user = await Users.findOne({ account });
      if (!user)
        return res.status(400).json({ msg: "This account dose not exists" });
      
      let user_temp = await Users.aggregate([
        { $match: { account: account } },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$followings" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  follower_num: 0,
                  followers: 0,
                  following_num: 0,
                  followings: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "followings",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$followers" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  follower_num: 0,
                  followers: 0,
                  following_num: 0,
                  followings: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "followers",
          },
        },
      ]);
      loginUser(user_temp[0], password, res);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Autheitication" });
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );

      return res.json({ msg: "Successfully logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if (!refresh_token)
        return res.status(400).json({ msg: "Please login now" });

      const decoded = <IDecodedToken>(
        jwt.verify(refresh_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id) return res.status(400).json({ msg: "Please login now" });

      const user_temp = await Users.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(decoded.id) } },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$followings" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  follower_num: 0,
                  followers: 0,
                  following_num: 0,
                  followings: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "followings",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$followers" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  follower_num: 0,
                  followers: 0,
                  following_num: 0,
                  followings: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "followers",
          },
        },
        {
          $project: {
            password: 0
          },
        },
      ]);

      // const user = await Users.findById(decoded.id).select(
      //   "-password +rf_token"
      // );
      const user = user_temp[0]
      if (!user)
        return res.status(400).json({ msg: "This account doesn't exist" });

      if (refresh_token !== user.rf_token) {
        return res.status(400).json({ msg: "Please login now" });
      }
      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token, user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgetPassword: async (req: Request, res: Response) => {
    try {
        const { account } = req.body;
        const user = await Users.findOne({ account })

        if (!user) 
            return res.status(400).json({ msg: 'This account dose not exist' })
        const access_token = generateAccessToken({ id: user._id })
        const url = `${CLIENT_URL}/reset_password/${access_token}`

        if (validateEmail(account)) {
            sendMail(account, url, "Forget password?")
            return res.json({msg: "Success, please check your email"})
        }
        

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  console.log(user)
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg:"password is incorrect"})

    const access_token = generateAccessToken({id: user._id});
    const refresh_token = generateRefreshToken({id: user._id}, res);

    // res.cookie("refreshtoken", refresh_token, {
    //     httpOnly: true,
    //     path:`/api/refresh_token`,
    //     maxAge: 30*24*60*60*1000  //30d
    // });

    await Users.findOneAndUpdate({ _id: user._id }, {
        rf_token: refresh_token
    })

    res.json({
        msg: 'Login Success',
        access_token,
        user: {...user, password:""}
    })

}


export default authCtrl;