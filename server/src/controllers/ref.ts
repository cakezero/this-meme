import type { Request, Response } from "express";
import cryptoRandomString from "crypto-random-string";
import { userModel } from "../models/refUser";
import { getSolBalance } from "../utils/getBalance";

export const userRef = async (req: Request, res: Response) => { 

  try {
    const { walletAddress, referrer } = req.body;

    const user = await userModel.findOne({ walletAddress });

    if (user) {
      const updatedUserBalance = await getSolBalance(String(walletAddress));

      user.solBalance = updatedUserBalance;
      res.status(200).json({ userInfo: user });
      return;
    }
    
    const referrerInfo = await userModel.findOne({ refId: referrer });

    const newRefId = cryptoRandomString({ length: 8, type: "alphanumeric" });
    req.body.refId = newRefId;

    const solBalance = await getSolBalance(walletAddress);
    req.body.solBalance = solBalance;

    if (!referrerInfo) {
      const newUser = new userModel(req.body);
      newUser.save();

      res.status(200).json({ message: "User created", userInfo: newUser });
      return;
    }
    
    referrerInfo.referrals += 1;
    referrerInfo.points += 10;
    referrerInfo.save();

    const newUser = new userModel(req.body);
    newUser.save();

    res.status(200).json({ message: "User created with referral", userInfo: newUser });

  } catch (error: any) {
    res.status(500).json({ message: "Error creating user", error: error.message });
    return;
  }
}

export const checkUser = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.query;

    const check = await userModel.findOne({ walletAddress })

    if (!check) {
      res.status(404).json({ error: "wallet address does not exist" });
      return;
    }

    const updatedUserBalance = await getSolBalance(walletAddress as string);

    check.solBalance = updatedUserBalance;
    check.save();

    res.status(302).json({ message: "User found", user: check });
  } catch (error: any) {
    res.status(500).json({ message: "Error checking user", error: error.message });
  }

}
