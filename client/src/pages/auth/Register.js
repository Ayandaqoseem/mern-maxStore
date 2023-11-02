import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";





export default function Register() {
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // context
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const { data } = await axios.post(`/register`, {
                name,
                email,
                password,
            });
            console.log(data);
            if(data?.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("Auth", JSON.stringify(data));
                setAuth({ ...auth, 
                    token: data.token,
                    user: data.user 
                });
                toast.success("Registration successful")
                navigate("/")
            }
           
        } catch (err) {
         console.log(err); 
         toast.error("Registration failed. Try again")  
        }
    }
    

    return (
        <div className="container wrapper">
           <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <input  
                            type="text"
                            className="form-control p-2 mb-2"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />


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
                            Register
                        </button>
                    </form>
                </div>
           </div>
        </div>
    )
}