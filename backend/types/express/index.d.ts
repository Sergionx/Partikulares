import { User } from "./models/User";

declare global {
  namespace Express {
    export interface Request {
      usuario?: User;
      isAdmin?: boolean;
    }
  }
}
