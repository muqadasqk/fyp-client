import clsx from "clsx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ name, label, optional, type = "text", ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const errorMessage = errors[name]?.message;

  return (
    <div className="relative pb-3">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label} {optional && <em className="text-gray-400">(Optional)</em>}
        </label>
      )}

      <input
        type={isPassword && showPassword ? "text" : type}
        id={name}
        {...register(name)}
        className={clsx(
          "bg-default mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
          {
            "border-red-500 focus:ring-red-500 focus:border-red-500": errorMessage,
            "border-gray-300 focus:ring-primary focus:border-primary-500": !errorMessage,
          })}
        {...props}
      />

      {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500 my-7 "
        >
          {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
        </span>
      )}

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
