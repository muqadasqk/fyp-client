import { useFormContext } from "react-hook-form";

const TextArea = ({ name, label, className = "", ...props }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label className="form-label">{label}</label>}
            <textarea {...register(name)} className="form-control" {...props} />
            {errors[name] && <p className="text-danger small">{errors[name].message}</p>}
        </div>
    );
};

export default TextArea;
