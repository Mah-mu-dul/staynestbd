import React, { useState } from "react";
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
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
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
      <button type="submit" disabled={!stripe || !elements} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Pay
      </button>
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </form>
  );
};

const CardPayment = () => {
  return <Elements stripe={stripePromise}>{<CheckoutForm />}</Elements>;
};

export default CardPayment;
