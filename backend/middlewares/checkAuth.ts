import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../models/User";

dotenv.config();

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -confirmed  -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "No se pudo verificar su token" });
    }
  } else {
    return res.status(401).json({ msg: "No contiene autorización" });
  }
}

export default checkAuth;
