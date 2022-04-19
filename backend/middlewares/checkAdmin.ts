import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config";
import Usuario from "../models/User";

async function checkAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const { usuario } = req;

    if (usuario.isAdmin) {
      return next();
    } else {
      return res.status(401).json({ msg: "No es administrador" });
    }
  } catch (error) {
    return res.status(404).json({ msg: "Hubo un error" });
  }

  next();
}

export default checkAdmin;
