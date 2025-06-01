import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
}
export default function Button({
  children,
  type = "button",

  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={` ${className}`} {...props} type={type}>
      {children}
    </button>
  );
}
