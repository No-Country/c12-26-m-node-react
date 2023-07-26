import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

export default function CheckoutForm({ options }) {
  const { clientSecret, appearance} = options
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Verificar si el componente CardElement está montado correctamente
    if (elements) {
      // si el componente se ha montado correctamente
      console.log("CardElement mounted successfully");
    }
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js not loaded.
      return;
    }

    setIsProcessing(true);

    try {
      // Realizar confirmación del intento de pago con el monto y el elemento de pago de Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        options.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "requires_action") {
        // Si el pago requiere autenticación adicional (3D Secure), se redirige al cliente
        setIsProcessing(false);
        stripe.handleCardAction(paymentIntent.client_secret).then((result) => {
          if (result.error) {
            setMessage(result.error.message);
          } else {
            // Confirmación exitosa después de la autenticación adicional
            setMessage("Payment succeeded!");
            // Manejar el caso de éxito, por ejemplo, mostrar un mensaje de éxito o actualizar el saldo de la wallet.
          }
        });
      } else {
        // Confirmación exitosa del intento de pago
        setMessage("Payment succeeded!");
        // Manejar el caso de éxito, por ejemplo, mostrar un mensaje de éxito o actualizar el saldo de la wallet.
      }
    } catch (error) {
      console.error(
        "Error durante la confirmación del intento de pago:",
        error,
      );
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Asegúrar de que CardElement se renderice dentro del formulario */}
      <CardElement id="card-element" options={options} />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span>{isProcessing ? "Processing ... " : "Pay Now"}</span>
      </button>
      {/* Mostrar cualquier mensaje de error o éxito */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
