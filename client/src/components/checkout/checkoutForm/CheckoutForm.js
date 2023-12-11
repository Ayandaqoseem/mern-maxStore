import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./CheckoutForm.module.scss";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Card from "../../cards/Card";
import LoadingGif from "../../../image/loading/spinner.gif";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveOrder = () => {
    console.log("Order saved");
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      })

        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          console.log("what error =>", result.error);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred during payment processing.");
    } finally {
      setIsLoading(false);

    }
   
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <section>
        <div className={`container ${styles.checkout}`}>

          <form onSubmit={handleSubmit}>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>

            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h4>Stripe Checkout</h4>

                <PaymentElement
                  id={styles["payment-element"]}
                  options={paymentElementOptions}
                />
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className={styles.button}
                >
                  <span id="button-text">
                    {isLoading ? (
                       <div
                       className="d-flex justify-content-center align-items-center"
                       style={{ height: "2vh" }}
                     >
                       <img style={{ width: "40px" }} src={LoadingGif} alt="loading.." />
                     </div>
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id={styles["payment-message"]}>{message}</div>}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
