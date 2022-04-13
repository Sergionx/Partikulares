//Libreries
import express from "express";
import morgan from "morgan";

//Routes
import shopRoutes from "./routes/shopRoutes";
import userRoutes from "./routes/userRoutes";

// Intitializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use("/", shopRoutes);
app.use("/api/users", userRoutes);

// Satic files

// Starting the server
app.listen(app.get("port"), () => console.log("Holaaaa"));
