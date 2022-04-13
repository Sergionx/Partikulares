import jwt from "jsonwebtoken";
import config from "../config/config";

function genJWT(id: string) {
  return jwt.sign(
    {
      id,
    },
    config.jwtSecret,
    { expiresIn: "30d" }
  );
}

export default genJWT;
