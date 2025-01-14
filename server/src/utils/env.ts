import * as dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL;

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const SOLANA_RPC = process.env.SOLANA_RPC || "https://api.devnet.solana.com";