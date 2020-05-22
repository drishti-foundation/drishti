import React from "react";

interface ButtonProps {
  name: string;
  selected: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ name, selected, onClick }: ButtonProps) {
  const className = selected ? "btn selected" : "btn";

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
