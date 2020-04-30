import React from "react";

interface ButtonProps {
  name: String;
  selected: Boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ name, selected, onClick }: ButtonProps) {
  let className = selected ? "btn selected" : "btn";

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
