import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;

