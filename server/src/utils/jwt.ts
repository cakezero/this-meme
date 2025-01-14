import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";
import type { User } from './types'

const JWT = {
  sign: (payload: User, options?: { expiresIn?: string }) => {
    const { expiresIn } = options ?? {};

    const token = expiresIn ? jwt.sign(payload, JWT_SECRET, { expiresIn }) : jwt.sign(payload, JWT_SECRET, { expiresIn: '' });
    return token;
  },

  verify: (token: string) => {
  
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  }
}

export default JWT