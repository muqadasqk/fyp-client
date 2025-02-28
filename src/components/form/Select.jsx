import { useFormContext } from "react-hook-form";

const Select = ({ name, label, options, className = "", selected = undefined, ...props }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label id={name} className="form-label">{label}</label>}
            <select {...register(name)} className="form-select" {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value} defaultChecked={selected == option.label} >
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <p className="text-danger small">{errors[name].message}</p>}
        </div>
    );
};

export default Select;
