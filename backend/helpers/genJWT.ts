import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function genJWT(id: string) {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
}

export default genJWT;
