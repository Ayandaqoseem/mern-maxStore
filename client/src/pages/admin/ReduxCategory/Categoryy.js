import { useDispatch } from "react-redux";
import AdminMenu from "../../../components/Nav/AdminMenu";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateeCategory";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";


export default function Category() {

  return (
    <>
      <section>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <CreateCategory />
                    <CategoryList />
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
