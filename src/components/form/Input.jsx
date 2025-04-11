import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ name, label, optional, type = "text", ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const errorMessage = errors[name]?.message;

  return (
    <Fragment>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {optional && <em className="text-gray-400 text-xs">(Optional)</em>}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          id={name}
          {...register(name)}
          {...props}
          className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
            errorMessage ? "border-red-500" : "border-gray-300"
          }`}
        />

        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </Fragment>
  );
};

export default Input;
