import mongoose from "mongoose";
import bcrpyt from "bcrypt";

const usuarioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrpyt.hash(this.password, 10);
});

usuarioSchema.methods.comparePassword = async function (
  passwordFormulario: string
) {
  return await bcrpyt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("User", usuarioSchema);
export default Usuario;
