import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  name: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ name, onClick, className = "", ...props }: ButtonProps) {
  return (
    <button {...props} onClick={onClick} className={`btn ${className}`}>
      {name}
    </button>
  );
}

export default Button;
