// Libraries
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

// Others
import conenctarDb from "./database";

// Intitializations
const app = express();
conenctarDb();
dotenv.config();

// Configuring CORS
const whitelist = [process.env.FRONTEND_URL as string];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      console.log("Puede consultar la API");
      callback(null, true);
    } else {
      // No puede consultar la API
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors()); //TODO- Add corsOptions

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("api/orders", orderRoutes);

// Satic files

// Starting the server
app.listen(app.get("port"), () => console.log("Holaaaa"));
