import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

const Select = ({ name, label, value, placeholder, icon, options = [], ...props }) => {
    const { register, watch, formState: { errors } } = useFormContext();
    const selectedValue = watch(name, value ?? "");

    return (
        <Fragment>
            {label && <label htmlFor={name}>{label}</label>}

            <div className="relative">
                <select
                    id={name}
                    className={`select-field ${errors[name] ? "select-error" : ""}`}
                    defaultValue={selectedValue}
                    {...register(name, { required: props.required ? `The ${name} field is required` : false })}
                    {...props}
                >
                    <option value="" disabled>{placeholder ?? "Choose one..."}</option>
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {errors[name] && <small className="error-message">{errors[name]?.message}</small>}
        </Fragment>
    );
};

export default Select;
