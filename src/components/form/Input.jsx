import { useFormContext } from "react-hook-form";

const Input = ({ name, label, type = "text", className = "", defaulValue, ...props }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label id={name} className="form-label">{label}</label>}
            <input type={type} {...register(name)} id={name} className="form-control" {...props} />
            {errors[name] && <p className="text-danger small">{errors[name].message}</p>}
        </div>
    );
};

export default Input;
