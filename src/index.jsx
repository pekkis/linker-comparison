import * as React from "react";
import { render } from "react-dom";
import Root from "./Root";

console.log("HELLUREI");

const root = document.getElementById("root");
if (!root) {
  throw new Error("Oh noes!");
}

render(<Root />, root);

console.log("I am suckling on a juicy duckling!");
