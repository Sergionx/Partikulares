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
import checkAdmin from "../middlewares/checkAdmin";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); // Crea un nuevo usuario
router.post("/login", authenticate); // Loguea un nuevo usuario
router.get("/confirmar/:token", confirm); // Confirmación del usuario
router.post("/olvide-password", forgotPassword); // Petición del reseteo del password del usuario
router
  .route("/olvide-password/:token")
  .get(verifyToken) // Verifica el token de reseteo de password
  .post(newPassword); // Actualiza el password del usuario

router.get("/perfil", checkAuth, profile);
export default router;
