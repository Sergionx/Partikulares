import express from "express";
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  verifyToken,
  newPassword,
  profile,
} from "../controllers/userController";
import checkAdmin from "../middlewares/checkAdmin&Auth";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

//Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); //Crea un nuevo usuario
router.post("/login", authenticate);
router.get("/confirmar/:token", confirm);
router.post("/olvide-password", forgotPassword);
router.route("/olvide-password/:token").get(verifyToken).post(newPassword);

router.get("/perfil", checkAuth, profile);
export default router;
