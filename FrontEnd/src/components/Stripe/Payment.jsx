import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Obtener el clientSecret al cargar el componente
    if (user?.payload?.token && amount > 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}payment/create-payment-intent`,
          {
            amount: amount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: user.payload.token,
            },
          },
        )
        .then((result) => {
          setClientSecret(result.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error al obtener el clientSecret:", error);
        });
    }
  }, [user?.payload?.token, amount]);

  return (
    <div className="mt-[200px]">
      <div className="bg-white p-4 rounded-xl mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Transfer Amount
        </label>
        <div className="flex flex-col items-start">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            min="0" // Asegurar que el monto no sea negativo
            inputMode="numeric" // Permitir solo entradas numéricas
            className="w-full mt-1 py-2 px-3 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      {clientSecret && amount > 0 && stripePromise && (
        <Elements stripe={stripePromise}>
          <div className="bg-white p-4 rounded-xl">
            <label
              htmlFor="card-element"
              className="block text-sm font-medium text-gray-700"
            >
              Card Information
            </label>
            <div className="mt-1" id="card-element">
              <CheckoutForm options={{ clientSecret }} />
            </div>
          </div>
        </Elements>
      )}
    </div>
  );
}
