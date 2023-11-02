import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loadng";
import axios from "axios";



export default function PrivateRoute() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [ok, setOk] = useState(false);


    useEffect(() => {
    const authCheck = async () => {
        try {
            const { data } = await axios.get(`/auth-check`);
            if(data.ok) {
                    setOk(true)
            } else {
                    setOk(false)
            }        
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized error occurred.');
              } else {
                console.log('An error occurred.');
              }
        }
    };

    authCheck();

    }, [auth?.token]);

    return ok ? <Outlet /> : <Loading />
}