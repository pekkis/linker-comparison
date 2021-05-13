import React, { FC } from "react";
import "./Error.css";

const Error: FC = ({ children }) => {
  return <section className="root">{children}</section>;
};

export default Error;
