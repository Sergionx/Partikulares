import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config";
import Usuario from "../models/User";

async function checkAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }
    
    const decoded: any = jwt.verify(token, config.jwtSecret);
    const user = await Usuario.findById(decoded.id);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(401).json({
        msg: error.message,
      });
    }
    
    if (!user.isAdmin) {
      const error = new Error("El usuario no es administrador");
      return res.status(401).json({
        msg: error.message,
      });
    }
    return next();
  } catch (error) {
    return res.status(404).json({ msg: "Hubo un error" });
  }

  // if (!token) {
  //   const error = new Error("Token no válido");
  //   return res.status(401).json({ msg: error.message });
  // }

  next();
}

export default checkAdmin;
