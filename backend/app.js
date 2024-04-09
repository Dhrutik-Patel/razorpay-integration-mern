import express from "express";
import cors from "cors";
import { config } from "dotenv";
import paymentRoutes from "./routes/paymentRoutes.js";

config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", paymentRoutes);

app.get("/api/config/razorpay", (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

export { app };
