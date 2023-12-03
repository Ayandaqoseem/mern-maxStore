import { useDispatch } from "react-redux";
import "./VerifyCoupon.scss";
import { useState } from "react";

export default function VerifyCoupon () {
                    const dispatch = useDispatch();
                    const [couponName, setCouponName] = useState("");
                    const [showForm, setShowForm] = useState(false);

                    return(
                                        <div>Verify Coupon</div>
                    )
}