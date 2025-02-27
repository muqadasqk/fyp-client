const AuthLayout = ({ children }) => {
    return (
        <div className={"d-flex flex-column vh-100"}>
            <main className="flex-grow-1">{children}</main>
        </div>
    );
};

export default MainLayout;
