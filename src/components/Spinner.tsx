/** @jsx jsx */
import { jsx } from "theme-ui";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div
      sx={{
        position: "fixed",
        top: 2,
        right: 2,
        fontSize: "3em",
        color: "rgb(0,0,0)"
      }}
    >
      <FaSpinner
        className="fa-spin"
        css={{
          animation: "fa-spin 5s infinite linear",
          "@keyframes fa-spin": {
            "0%": {
              transform: "rotate(0deg)"
            },
            "100%": {
              transform: "rotate(359deg)"
            }
          }
        }}
      />
    </div>
  );
};

export default Spinner;
