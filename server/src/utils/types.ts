import type { Request } from 'express'
export type User = {
  email: string,
  username: string,
}

export interface CustomRequest extends Request {
  user?: object | string
}
