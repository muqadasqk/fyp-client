import clsx from "clsx";
import { useFormContext } from "react-hook-form";

const Select = ({
    name,
    label,
    value,
    placeholder,
    icon,
    optional,
    options = [],
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    console.log(options, "options");

    return (
        <div className="relative pb-3">
            {label && (
                <label htmlFor={name} className="font-medium">
                    {label} {optional && <em className="text-gray-400">(Optional)</em>}
                </label>
            )}

            {/* {icon && (
                <div className="absolute inset-y-0 right-0 px-3  flex items-center pointer-events-none">
                    {icon}
                </div>
            )} */}

            <select
                defaultValue={value}
                id={name}
                {...register(name)}
                className={clsx(
                    `input-primary mt-1 block w-full`,
                    {
                        "border-red-400 focus:ring-0": errors[name],
                        // "border-gray-300 focus:ring-primary focus:border-primary-500": !errors[name],
                    }
                )}
                {...props}

            >
                <option value="" disabled selected>
                    {placeholder ?? "Choose one..."}
                </option>
                {options.map(({ value, label }) => (
                    <option key={label} value={value}>
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
