import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartDB, saveCartDB, selectCartItems } from "../../redux/features/cart/cartSlice";

export default function Login() {
  const { cartItems } = useSelector(selectCartItems)

  // const [urlParams] = useSearchParams();
  // const redirect = urlParams.get("redirect")
  // console.log("show redirect =>", urlParams.get("redirect"));

  // console.log("show me cart items =>", cartItems);
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // context
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      // const storedRedirect = localStorage.getItem("logoutRedirect");
      // localStorage.removeItem("logoutRedirect");

      
      if (data?.error) {
        toast.error(data.error);
      } else {
        // if(redirect === "cart") {
        //   dispatch(saveCartDB({
        //     cartItems: JSON.parse(localStorage.getItem("cartItems"))
        //   }))
        //   return navigate("/cart")
        // }
        const redirectPath =
          // storedRedirect 
          dispatch(getCartDB()) ||
          `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`;
          
        localStorage.setItem("Auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        navigate(redirectPath);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again");
    }
  };

  // useEffect(() => {
  //   console.log(dispatch(getCartDB())); 
  // })

  return (
    <div className="wrapper-container-login-reg">
      <div className="container wrapper">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control p-2 mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control p-2 mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-info" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
