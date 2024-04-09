import express from "express";
import { checkout, paymentSuccess } from "../controllers/paymentControllers.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/payment/success").post(paymentSuccess);

export default router;
