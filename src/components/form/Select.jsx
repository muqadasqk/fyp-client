import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

const Select = ({
  name,
  label,
  value,
  placeholder,
  icon,
  options = [],
  ...props
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch(name, value ?? "");

  return (
    <Fragment>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
      {icon && (
          <div className="absolute inset-y-0 right-0 px-3  flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={name}
          className={`block w-full appearance-none px-4 py-2 pr-10 bg-white border ${
            errors[name]
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } rounded-md shadow-sm focus:outline-none sm:text-sm transition duration-150 ease-in-out`}
          defaultValue={selectedValue}
          {...register(name, {
            required: props.required ? `The ${name} field is required` : false,
          })}
          {...props}
        >
          <option value="" disabled>
            {placeholder ?? "Choose one..."}
          </option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {errors[name] && (
        <small className="text-sm text-red-600 mt-1 block">
          {errors[name]?.message}
        </small>
      )}
    </Fragment>
  );
};

export default Select;
