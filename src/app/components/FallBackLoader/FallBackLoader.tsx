"use client"
import { Oval } from "react-loader-spinner";
import styles from "./FallBackLoader.module.css";
const FallBackLoader = () => {
  return (
    <div className={styles.container}>
      <Oval
        height={100}
        width={100}
        color="#1976d2"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#1976d2"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

export default FallBackLoader;
