import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ name, label, value, type = "text", icon, ...props }) => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const errorMessage = errors[name]?.message;

    return (
        <Fragment>
            {label && <label htmlFor={name}>{label}</label>}

            <div className="relative">
                {/* {icon && <span className="absolute left-2 top-2">{icon}</span>} */}

                <input
                    type={isPassword && showPassword ? "text" : type}
                    id={name}
                    className={`input-field ${errorMessage ? "input-error" : ""}`}
                    {...register(name, { required: props.required ? `The ${name} field is required` : false })}
                    defaultValue={value ?? undefined}
                    {...props}
                />

                {isPassword && (
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 cursor-pointer"
                    >
                        {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
                    </span>
                )}
            </div>

            {errorMessage && <small className="error-message">{errorMessage}</small>}
        </Fragment>
    );
};

export default Input;
