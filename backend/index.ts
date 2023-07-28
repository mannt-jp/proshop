import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import session from "express-session";
// import { default as connectMongoDBSession } from "connect-mongodb-session";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
// const MongoDBStore = connectMongoDBSession(session);
// if (process.env.MONGO_URI && process.env.SESSION_SECRET) {
//   const store = new MongoDBStore({
//     uri: process.env.MONGO_URI,
//     collection: "sessions",
//   });
//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       store: store
//     })
//   );
// }
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);
app.listen(port, () => console.log("Server is running on port", port));
