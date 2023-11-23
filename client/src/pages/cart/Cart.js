import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems } from "../../redux/features/cart/cartSlice";

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  };
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h5>Shopping Cart</h5>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <div>
              <Link to="/shop">&larr; Back to shop</Link>
            </div>
          </>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((cart, index) => {
                const { _id, name, photo, price, cartQuantity } = cart 
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img 
                        src={photo[0]}
                        alt={name}
                        style={{width: "100px"}}
                      />
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button 
                          className="--btn"
                          onClick={() => decreaseCart(cart)}
                        >
                          -
                        </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button 
                          className="--btn"
                          onClick={() => increaseCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{price * cartQuantity}</td>
                    <td className={styles.icons}>
                      <FaTrashAlt 
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                ) 
              })}
            </tbody>
          </table>
          </>
        )}
      </div>
    </section>
  );
}
