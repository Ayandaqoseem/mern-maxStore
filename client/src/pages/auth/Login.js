import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";




export default function Login() {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // context
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password);
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });
            console.log(data);
            if(data?.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("Auth", JSON.stringify(data));
                setAuth({ ...auth, token: data.token, user: data.user });
                toast.success("Login successful")
                 navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
            }
           
        } catch (err) {
         console.log(err); 
         toast.error("Login failed. Try again")  
        }
    }
    

    return (
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
    )
}