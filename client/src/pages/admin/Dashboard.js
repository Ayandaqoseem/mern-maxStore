import { useAuth } from "../../context/auth"
import AdminMenu from "../../components/Nav/AdminMenu";

export default function AdminDashboard() {
    // context
    const [auth, setAuth] = useAuth();
    return (
        <div className="container-fluid d-wrapper">
           <div className="row">
            <div className="col-md-2 --sidebar-wrapper-dashboard">
                <AdminMenu />
            </div>

            <div className="col-md-10 mt-5 container">
            <p className="p-3 mt-2 h6 custom-text fw-bold">Admin information</p>
                

            <ul className="list-group pb-3">
                <li className="list-group-item">{auth?.user?.name}</li>
                <li className="list-group-item">{auth?.user?.email}</li>
                <li className="list-group-item">admin</li>
            </ul>
            </div>
           </div>
        </div>
    )
}