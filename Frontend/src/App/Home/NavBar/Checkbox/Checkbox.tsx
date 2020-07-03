import React from "react";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Checkbox({ name, checked, onClick }: CheckboxProps) {
  const className = checked ? "checkbox selected" : "checkbox";

  return (
    <button role="checkbox" className={className} onClick={onClick} autoFocus aria-checked={checked}>
      <svg className="svg" viewBox="0 0 110 110">
        <rect className="box" x="5" y="5" width="100" height="100" transform="rotate(90 55 55)" />
        <path className={checked ? "check" : "unchecked"} d="M90,20 L45.7,75.1 L20.2,55.4" />
      </svg>
      {name}
    </button>
  );
}

export default Checkbox;
