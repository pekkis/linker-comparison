import { render } from "react-dom";
import Root from "./Root";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Oh noes!");
}

render(root, <Root />);
console.log("I am suckling on a juicy duckling!");
