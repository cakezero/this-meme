import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import admin from "./src/routes/adminRoutes";
import DB from "./src/configs/db";
import logger from "./src/configs/logger";
import ref from "./src/routes/refRoutes";
import { PORT } from "./src/utils/env";

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());

server.use("/api", ref);
server.use("/admin", admin);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  DB();
});
