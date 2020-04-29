import * as React from "react";

interface Button {
  name: String;
  selected: Boolean;
  onClick: Function;
}

function Button({ name, selected, onClick }) {
  let className = selected ? "btn selected" : "btn";

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
