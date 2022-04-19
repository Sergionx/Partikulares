import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config";
import Usuario from "../models/User";

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, config.jwtSecret);

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -confirmed  -createdAt -updatedAt -__v"
      );

      console.log(req.usuario);
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  } else {
    return res.status(401).json({ msg: "No contiene autorización" });
  }

  next();
}

export default checkAuth;
