import { useForm, FormProvider } from "react-hook-form";

const Form = ({ children, onSubmit, defaultValues, resolver }) => {
    const methods = useForm({ defaultValues, resolver });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-100">
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
