import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const ENVIRONMENT = process.env.NODE_ENV || "development";

const SOLANA_RPC = process.env.SOLANA_RPC || "https://api.devnet.solana.com";

export { JWT_SECRET, PORT, DB_URL, ENVIRONMENT, SOLANA_RPC };
