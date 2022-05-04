import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectarDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en ${url}`);
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
}
export default conectarDb;