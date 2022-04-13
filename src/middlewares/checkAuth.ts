import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Usuario from "../models/User.js";

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, config.jwtSecret);
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  // if (!token) {
  //   const error = new Error("Token no válido");
  //   return res.status(401).json({ msg: error.message });
  // }

  next();
}

export default checkAuth;
