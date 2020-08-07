import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  name: string;
  className?: string;
}

function Button({ name, className = '', ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn ${className}`}>
      {name}
    </button>
  );
}

export default Button;
