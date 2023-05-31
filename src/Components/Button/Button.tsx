import React from "react";

function Button({
  text,
  type,
  onClick,
}: {
  text: string;
  type: "primary" | "secondary" | "danger";
  onClick?: () => void;
}) {
  const btnType = {
    primary: `border-green-500 hover:bg-green-500 text-green-700`,
    secondary: `border-yellow-500 hover:bg-yellow-500 text-yellow-700`,
    danger: `border-red-500 hover:bg-red-500 text-red-700`,
  };

  return (
    <button
      className={`${btnType[type]} bg-transparent font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
