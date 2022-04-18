import mongoose from "mongoose";
import config from "./config/config";

async function conectarDb() {
  try {
    const connection = await mongoose.connect(config.DB.URI);
    
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en ${url}`);
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
}
export default conectarDb;