import { FaListAlt } from "react-icons/fa";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import Search from "../../search/Search";

export default function ProductList({ products }) {
  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" />

          <FaListAlt size={24} color="#0066d4" />
          <p>
            <b>{products.length} products found</b>
          </p>
        </div>
        <div>
          <Search
            className={styles.search}
            iconClass={styles["icon-search"]}
            searchProductList={styles["search-productList"]}
          />
        </div>
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="latest-price">Latest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
