import { Button } from "@components";
import clsx from "clsx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ name, label, optional, type = "text", addOn, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const errorMessage = errors[name]?.message;

  return (
    <div className="relative pb-3">
      {label && (
        <label htmlFor={name} className="font-medium flex justify-between items-center">
          <span>{label} {optional && <em className="text-gray-500">(Optional)</em>}</span>

          {addOn && <div className="text-right">
            <Button href="/forgot-password">
              Forgot Password?
            </Button>
          </div>}
        </label>
      )}

      <input
        type={isPassword && showPassword ? "text" : type}
        id={name}
        {...register(name)}
        className={clsx(
          "input-primary mt-1 block w-full",
          {
            "border-red-400 focus:ring-0": errorMessage,
            // "border-gray-300 focus:ring-primary focus:border-primary-500": !errorMessage,
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
