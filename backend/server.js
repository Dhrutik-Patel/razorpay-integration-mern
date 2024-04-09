import { app } from "./app.js";
import Razorpay from "razorpay";
import connectDB from "./config/database.js";

connectDB();

// Razorpay instance with key_id and key_secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Listen on port
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});

export { razorpay };
