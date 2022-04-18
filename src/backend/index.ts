// Libraries
import express from "express";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

// Intitializations
const app = express();
import conenctarDb from "./database";
conenctarDb();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("api/order", orderRoutes);

// Satic files

// Starting the server
app.listen(app.get("port"), () => console.log("Holaaaa"));
