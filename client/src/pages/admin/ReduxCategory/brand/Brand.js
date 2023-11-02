import { useDispatch } from "react-redux";
import AdminMenu from "../../../../components/Nav/AdminMenu";
import { getBrands } from "../../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import BrandList from "./BrandList";
import CreateBrand from "./CreateBrand";



export default function Brand () {
    


  
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <CreateBrand  />
                        <BrandList />
                    </div>
                </div>
            </div>
        </>
    )
}
