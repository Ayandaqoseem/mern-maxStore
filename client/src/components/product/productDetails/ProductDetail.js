import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../../redux/features/product/productSlice";
import styles from "./ProductDetails.module.scss";
import LoadingGif from "../../../image/loading/spinner.gif";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <div>
          <Link to="/shop">&larr;</Link>
        </div>
        <h5>Product Details</h5>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
        </div>
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img
                src={product?.photo[imageIndex]}
                alt={product?.name}
                className={styles.pImg}
              />
              <div className={styles.smallImage}>
                {product?.photo.map((img, index) => {
                  return (
                    <img
                      src={img}
                      className={imageIndex === index ? "activeImg" : ""}
                      key={index}
                      alt="product"
                      onClick={() => setImageIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
