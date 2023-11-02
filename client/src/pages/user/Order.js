import UserMenu from "../../components/Nav/UserMenu";


export default function Order() {
    return (
        <div className="container mt-5">
            <div className="row">
               <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                <p className="p-3 mt-2 h6 custom-text fw-bold">Order</p>
                </div> 
            </div>
        </div>
    )
}