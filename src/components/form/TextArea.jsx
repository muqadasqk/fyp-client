import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

const TextArea = ({ name, label, rows = 4, ...props }) => {
    const { register, formState: { errors } } = useFormContext();
    const errorMessage = errors[name]?.message;

    return (
        <Fragment>
            {label && <label htmlFor={name}>{label}</label>}

            <textarea
                id={name}
                className={`textarea-field ${errorMessage ? "textarea-error" : ""}`}
                {...register(name, { required: props.required ? `The ${name} field is required` : false })}
                rows={rows}
                {...props}
            />

            {errorMessage && <small className="error-message">{errorMessage}</small>}
        </Fragment>
    );
};

export default TextArea;
