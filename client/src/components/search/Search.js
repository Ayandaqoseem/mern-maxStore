import { BiSearch } from "react-icons/bi"
import styles from "./Search.module.scss";


export default function Search ({ value, onChange }) {
    return(
        <div className={styles.search}>
            <BiSearch size={18} className={styles.icon} />
            <input
                className={styles.inputHolder}
                type="text"
                placeholder="search products" 
                value={value}
                onChange={onChange}
            />
        </div>
    )
}