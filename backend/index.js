import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use("/images", express.static("uploads"));
const port = process.env.PORT || 6001;

// Middleware

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*, content-type,accept");
	next();
});

//  DB CONNECTION
connectDB();

// Api endpoints

app.use("/api/food", foodRouter);

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.use("/api/admin", adminRouter);

app.listen(port, () => {
	console.log("server runing at port", port);
});
