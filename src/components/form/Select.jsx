import clsx from "clsx";
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
        <div className="relative pb-3">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-gray-700 "
                >
                    {label}
                </label>
            )}

            {/* {icon && (
                <div className="absolute inset-y-0 right-0 px-3  flex items-center pointer-events-none">
                    {icon}
                </div>
            )} */}
           
                defaultValue={selectedValue} <select
                id={name}
                    className={clsx("block w-full appearance-none px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out",
                        { "border-red-500 focus:ring-red-500 focus:border-red-500": errors[name],
                          "border-gray-300 focus:ring-primary focus:border-primary-500": !errors[name],
                        }
                      )}
                {...register(name)}
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

            {errors[name] && (
                <small className="text-sm text-red-600 block mt-1 italic">
                    {errors[name]?.message}
                </small>
            )}
        </div>
    );
};

export default Select;
