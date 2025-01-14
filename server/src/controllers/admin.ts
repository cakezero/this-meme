import type { Request, Response } from "express";
import Admin from "../models/adminModel";
import userModal from "../models/refUser";
import logger from "../configs/logger";
import bcrypt from "bcrypt";
import JWT from "../utils/jwt";
import type { CustomRequest } from "../utils/types"

const adminRegister = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword, username, email } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match!" });
      return;
    }

    const emailExists = await Admin.findOne({ email });

    if (emailExists) {
      res.status(302).json({ error: "email already exists!" });
      return;
    }

    const usernameExists = await Admin.findOne({ username });

    if (usernameExists) {
      res.status(302).json({ error: "username already exists!" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log({ hashedPassword });

    const newAdmin = new Admin({ password: hashedPassword, username, email });

    newAdmin.save();
    const token = JWT.sign(newAdmin, { expiresIn: "7d" });

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    logger.error(`Error registering admin: ${error}`);
    res.status(500).json({ catchError: "Internal Server Error" });
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { auth, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ email: auth }, { username: auth }],
    });
    if (!admin) {
      res
        .status(404)
        .json({ error: "Invalid credentials or User does not exist!" });
      return;
    }

    const checkPassword = await bcrypt.compare(password, admin!.password);
    if (!checkPassword) {
      res
        .status(400)
        .json({ error: "Invalid credentials or User does not exist!" });
      return;
    }

    const token = JWT.sign({ email: admin.email, username: admin.username });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ catchError: "Internal Server Error" });
  }
};

const adminDashboard = async (req: Request, res: Response) => {
  try {
    const users = await userModal.find().sort({ referrals: -1 });
    res.status(302).json({ users });
  } catch (error) {
    logger.error(`Error rendering dashboard: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

const adminLogout = (req: CustomRequest, res: Response) => {
  req.user = "";
  return
};

export {
  adminLogout,
  adminDashboard,
  adminLogin,
  adminRegister,
};
