import { Request, Response } from "express";
import genId from "../helpers/genId";
import genJWT from "../helpers/genJWT";
import User from "../models/User";
async function register(req: Request, res: Response) {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await User.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new User(req.body);
    usuario.token = genId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
}

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no ha sido encontrado");
    return res.status(400).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el password es correcto
  if (await usuario.compararPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: genJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(400).json({ msg: error.message });
  }
}

async function confirm(req: Request, res: Response) {
  const { token } = req.params;
  const usuarioConfirmar = await User.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("El token no es valido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = null;
    await usuarioConfirmar.save();

    res.json({ msg: "Cuenta confirmada correctamente" });
  } catch(error) {
    console.log(error);
  }
}

async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  // Comprobar si el usuario existe
  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no ha sido encontrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = genId();
    await usuario.save();
    res.json({
      msg: "Se ha enviado un correo electronico con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
}

async function verifyToken(req: Request, res: Response) {
  const { token } = req.params;

  const tokenValido = await User.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("El token no es valido");
    return res.status(400).json({ msg: error.message });
  }
}

async function newPassword(req: Request, res: Response) {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await User.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
      res.json({ msg: "Se ha cambiado el password correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("El token no es valido");
    return res.status(404).json({ msg: error.message });
  }

  console.log(token);
  console.log(password);
}

async function profile(req: Request, res: Response) {
  const {usuario} = req.body
  res.json({usuario})
}

export {
  register,
  authenticate,
  confirm,
  forgotPassword,
  verifyToken,
  newPassword,
  profile
};
