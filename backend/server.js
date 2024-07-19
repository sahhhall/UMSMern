import express from "express";
import "dotenv/config";
import cookieParser from 'cookie-parser';
const app = express();
import { errorHandler, notfound } from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from './routes/admin.route.js'
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use(notfound);
app.use(errorHandler);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
