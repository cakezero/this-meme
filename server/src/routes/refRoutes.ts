import express from "express";
import { userRef, checkUser } from "../controllers/ref";

const router = express.Router();

router
  .post("/ref", userRef)
  .get("/check-user", checkUser);


export default router;