import React, { FC } from "react";
import styles from "./Error.module.css";

const Error: FC = ({ children }) => {
  return <section className={styles.root}>{children}</section>;
};

export default Error;
