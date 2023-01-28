import express from "express";
import userCtrl from "../controllers/userCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.patch('/user', auth, userCtrl.updateUser)

router.patch("/reset_password", auth, userCtrl.resetPassword);

router.get("/user/followState",auth, userCtrl.getIsFollowed);

router.get('/user/:id', userCtrl.getUser)

router.patch("/user/follow/:id", auth, userCtrl.followUser);

router.patch("/user/unfollow/:id", auth, userCtrl.unfollowUser);


export default router;
