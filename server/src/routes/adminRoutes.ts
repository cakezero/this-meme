import express from "express";
import {
  adminLogin,
  adminLogout,
  adminDashboard,
  adminRegister,
} from "../controllers/admin";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router
  .post("/login", adminLogin)
  .get("/logout", requireAuth, adminLogout)
  .post("/dashboard", requireAuth, adminDashboard)
  .post("/register", adminRegister)

export default router;
