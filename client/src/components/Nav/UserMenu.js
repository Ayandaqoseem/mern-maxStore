import { NavLink } from "react-router-dom"


export default function UserMenu() {
    return (
        <div className="sidebar-wrapper-dashboard sticky">
            <p className="p-3 mt-2 h6 custom-text fw-bold">User dashboard</p>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink
                        className="nav-link text-warning-emphasis"
                        to="/dashboard/user/profile"
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link text-warning-emphasis"
                        to="/dashboard/user/order"
                    >
                        Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}