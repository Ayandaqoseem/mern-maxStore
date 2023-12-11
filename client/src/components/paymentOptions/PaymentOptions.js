import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAVE_PAYMENT_METHOD } from "../../redux/features/checkout/checkoutSlice";
import { useAuth } from "../../context/auth";

export default function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const [auth, setAuth] = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      return toast.error("please select payment method");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (auth?.user) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };
  return (
    <>
      <p>Please choose a payment method</p>
      <form className="--form-control" onSubmit={setPayment}>
        <label htmlFor="stripe" className="radio-label">
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            id="stripe"
            value={"stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>
          Stripe
        </label>

        <label htmlFor="flutterwave" className="radio-label">
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            id="flutterwave"
            value={"flutterwave"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>
          Flutterwave
        </label>

        <label htmlFor="paypal" className="radio-label">
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            id="paypal"
            value={"paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>
          Paypal
        </label>

        <label htmlFor="wallet" className="radio-label">
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            id="wallet"
            value={"wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>
          Wallet
        </label>
        <button type="submit" className="--btn --btn-primary --btn-block">
          Checkout
        </button>
      </form>
    </>
  );
}
