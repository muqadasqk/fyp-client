import loadingSpinner from "../../assets/icons/loading.spinner.svg";

const Button = ({ isLoading, children, ...props }) => {
    return (
        <button {...props} disabled={isLoading}>
            {isLoading ? (
                <>
                    <img src={loadingSpinner} width={20} alt="Loading..." className="spinner-icon" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
