import { useAuth } from "../../context/auth";
import Logo from "../../image/logo/MaxLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
} from "../../redux/features/cart/cartSlice";

export default function Menu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  // const location = useLocation();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("Auth");
    // localStorage.setItem("logoutRedirect", window.location.pathname);
    // localStorage.setItem("cartItems", JSON.stringify([]))

    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="/">
            <img
              src={Logo}
              alt="logo"
              width="30"
              height="30"
              className="d-inline-block align-text-center mb-2"
            />
            <span className="text-danger-emphasis h4 fw-bold">MaxStore</span>
          </a>
          <div
            className={`offcanvas offcanvas-start ${
              isNavbarOpen ? "show" : ""
            }`}
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              {/* <a className="navbar-brand" href="/">
                <img
                  src={Logo}
                  alt="logo"
                  width="30"
                  height="30"
                  className="d-inline-block align-text-center mb-2"
                />
                <span className="text-danger-emphasis h4 fw-bold">
                  MaxStore
                </span>
              </a> */}
              <button
                type="button"
                className="btn-close right"
                onClick={() => setIsNavbarOpen(false)}
                aria-label="Close"
              />
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {!auth?.user && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-warning-emphasis extra-com"
                        to="/login"
                        onClick={handleLinkClick}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-warning-emphasis extra-com"
                        to="/register"
                        onClick={handleLinkClick}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                  <div className="nav-shop-username-container">
                    {auth?.user && (
                      <div className="menu-nav-flex">
                        <div className="dropdown menu-dropdown">
                          <li>
                            <a
                              className="nav-link custom-pointer dropdown-toggle text-color"
                              data-bs-toggle="dropdown"
                            >
                              {auth?.user?.name}
                            </a>

                            <ul className="dropdown-menu">
                              <li className="nav-item">
                                <NavLink
                                  className="nav-link text-warning-emphasis"
                                  to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                  }`}
                                  onClick={handleLinkClick}
                                >
                                  Dashboard
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link text-warning-emphasis custom-pointer"
                                  onClick={() => {
                                    handleLinkClick();
                                    logout();
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </li>
                        </div>
                      </div>
                    )}

                    <div className="menu-nav-flex">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-warning-emphasis extra-com"
                          to="/shop"
                          onClick={handleLinkClick}
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-warning-emphasis extra-com cart-count"
                          to="/cart"
                          onClick={handleLinkClick}
                        >
                          Cart
                          <FaShoppingCart size={20} />
                          <p>{cartTotalQuantity}</p>
                        </NavLink>
                      </li>
                    </div>

                  </div>

                {auth?.user?.role === 1 && (
                  <div className="col-md-3 sidebar-wrapper">
                    <p className="p-3 mt-2 h6 custom-text fw-bold">
                      Admin dashboard
                    </p>

                    <ul className="list-group menu-product-bar">
                      {/* <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/category"
                          onClick={handleLinkClick}
                        >
                          Create category
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/redx-category"
                          onClick={handleLinkClick}
                        >
                          Category
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/brand"
                          onClick={handleLinkClick}
                        >
                          Brand
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/all-products"
                          onClick={handleLinkClick}
                        >
                          All Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/add-product"
                          onClick={handleLinkClick}
                        >
                          Add Product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/coupon"
                          onClick={handleLinkClick}
                        >
                          Coupon
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/sub-category"
                          onClick={handleLinkClick}
                        >
                          Sub category
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/product"
                          onClick={handleLinkClick}
                        >
                          Create product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/products"
                          onClick={handleLinkClick}
                        >
                          Products
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/slide"
                          onClick={handleLinkClick}
                        >
                          Banner slide
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-warning-emphasis"
                          to="/dashboard/admin/slides"
                          onClick={handleLinkClick}
                        >
                          Banner slides
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
