import React from "react";

interface Button {
  name: String;
  className: String;
  onClick: Function;
}

function Button({ name, onClick, className = "", ...props }) {
  return (
    <button {...props} onClick={onClick} className={`btn ${className}`}>
      {name}
    </button>
  );
}

export default Button;
