import { FaListAlt } from "react-icons/fa";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import Search from "../../search/Search";
import { useState } from "react";
import ProductItem from "../productItem/ProductItem";

export default function ProductList({ products }) {
  const [grid, setGrid] = useState(true);
  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill 
            size={22} 
            color="orangered"
            onClick={() => setGrid(true)} 
          />

          <FaListAlt 
            size={24} 
            color="#0066d4"
            onClick={() => setGrid(false)}
          />
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
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem 
                    {...product} 
                    grid={grid}
                    product={product}
                  />
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  );
}
