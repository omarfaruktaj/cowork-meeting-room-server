import { RequestHandler } from "express";
import envConfig from "../../config/env";
import Stripe from "stripe";

const stripe = new Stripe(envConfig.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2024-06-20",
});

export const paymentController: RequestHandler = async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
