import React, { useId, forwardRef } from "react";

type InputProps = React.HTMLProps<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label
          className="inline-block text-slate-700  pl-1 mt-2 text-sm"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
