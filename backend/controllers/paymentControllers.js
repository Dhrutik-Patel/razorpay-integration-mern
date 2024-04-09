import Payment from "../models/paymentModel.js";
import { razorpay } from "../server.js";
import crypto from "crypto";

// @DESC Checkout route for payment
// @ROUTE POST /api/checkout
// @ACCESS Public
const checkout = async (req, res) => {
    const amount = +req.body.amount;
    const currency = "INR";

    const options = {
        amount: amount * 100, // amount in smallest currency unit (here in paisa)
        currency,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
};

// @DESC Payment success route
// @ROUTE POST /api/payment/success
// @ACCESS Public
const paymentSuccess = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

    console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ msg: "Invalid signature" });
    }

    // You can save the payment details in your database here
    await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
    });

    res.redirect(
        `http://localhost:3000/payment/success?ref=${razorpay_payment_id}`
    );
};

export { checkout, paymentSuccess };
