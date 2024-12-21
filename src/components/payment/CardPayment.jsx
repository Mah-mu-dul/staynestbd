import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51QYUr4P2Q4T6shkkM6s5Qb7ZaWlhisA8yMNR3hXRrjiU7mxdgOIAhJhgohwYEP53Pn2Zalygfy9LGSXSDGLrb1qq00h7mwDSW8"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: 1000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not loaded correctly.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Card element is not available.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log(paymentMethod);
      setErrorMessage(null); // Clear error message on success
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: "changeme@test.com" || "anonymous@test.com",
            name: "John Doe" || "anonymous",
          },
        },
      });

    if (confirmError) {
      setErrorMessage("Payment failed: " + confirmError.message);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-5 border border-gray-300 rounded"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": {
                color: "#999",
              },
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Pay
      </button>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </form>
  );
};

const CardPayment = () => {
  return <Elements stripe={stripePromise}>{<CheckoutForm />}</Elements>;
};

export default CardPayment;
