import { useAuth } from "../../context/auth"
import UserMenu from "../../components/Nav/UserMenu";

export default function Dashboard() {
    // context
    const [auth, setAuth] = useAuth();
    return (
        <div className="container mt-5">
           <div className="row">
            <div className="col-md-3 ">
                <UserMenu />
            </div>

            <div className="col-md-9">
            <p className="p-3 mt-2 h6 custom-text fw-bold">User information</p>
                

            <ul className="list-group">
                <li className="list-group-item">{auth?.user?.name}</li>
                <li className="list-group-item">{auth?.user?.email}</li>
                <li className="list-group-item">user</li>
            </ul>
            </div>
           </div>
        </div>
    )
}