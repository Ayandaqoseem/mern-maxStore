import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/Nav/Menu";
import Dashboard from "./pages/user/Dashboard"
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import NewNavMenu from "./components/Nav/NewNavMenu";
// import AdminProduct from "./pages/admin/Product";
import AdminCategory from "./pages/admin/Category";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
// import SubCategory from "./pages/admin/SubCategory";
// import AdminProducts from "./pages/admin/products";
// import AdminProductUpdate from "./pages/admin/ProductUpdate";
import AdminSlide from "./pages/admin/Slide";
import AllSlides from "./pages/admin/Slides";
import AdminSlideUpdate from "./pages/admin/SlideUpdate";
import Category from "./pages/admin/ReduxCategory/Categoryy";
import Brand from "./pages/admin/ReduxCategory/brand/Brand";
import AddProduct from "./pages/admin/ReduxCategory/product/addProduct";
import ViewProducts from "./pages/admin/ReduxCategory/product/viewProducts";
import EditProduct from "./pages/admin/ReduxCategory/product/editProduct";
import Footer from "./components/footer/Footer";
import Coupon from "./pages/admin/ReduxCategory/coupon/Coupon";
import Product from "./pages/shop/Product"



const PageNotFound = () => {
  return (
    <div className="d-flex h3 justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};


export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <NewNavMenu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/Profile" element={<Profile />} />
          <Route path="user/order" element={<Order />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/redx-category" element={<Category />} />
          <Route path="admin/brand" element={<Brand />} />
          <Route path="admin/add-product" element={<AddProduct />} />
          <Route path="admin/all-products" element={<ViewProducts />} />
          <Route path="admin/edit-product/:id" element={<EditProduct />} />
          <Route path="admin/coupon" element={<Coupon />} />

          {/* <Route path="admin/sub-category" element={<SubCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} /> */}
          <Route path="admin/slide" element={<AdminSlide />} />
          <Route path="admin/slides" element={<AllSlides />} />
          <Route path="admin/slide/update/:slug" element={<AdminSlideUpdate />} />
        </Route>

        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

 
