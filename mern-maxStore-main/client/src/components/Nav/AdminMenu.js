import { NavLink } from "react-router-dom"


export default function AdminMenu() {
    return (
        <div className="sidebar-wrapper-dashboard">
            <p className=" mt-2 h6 --text-warning-emphasis fw-bold">Admin dashboard</p>

            <ul className="list-group list-unstyled">
                {/* <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3"
                        to="/dashboard/admin/category"
                    >
                        Create category
                    </NavLink>
                </li> */}
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/redx-category"
                    >
                        Category
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/brand"
                    >
                        Brand
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/all-products"
                    >
                        All Products
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/add-product"
                    >
                        Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/order-history"
                    >
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3"
                        to="/dashboard/admin/coupon"
                    >
                        Coupon
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/slide"
                    >
                        Banner slide
                    </NavLink>
                    <NavLink
                        className="nav-link --text-warning-emphasis pb-3 pt-2"
                        to="/dashboard/admin/slides"
                    >
                        Banner slides
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}