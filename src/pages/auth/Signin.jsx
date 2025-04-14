import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContent, Button, Form, Input } from "@components";
import { signinSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "@features";
import { Link } from "react-router-dom";

const Signin = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSignin = async (data) => {
        dispatch(signin(data));
    };

    return (
        <AuthContent
            title="Sign In"
            description="Welcome back! Please enter your credentials to continue"
            className="lg:w-[30%] "
        >
            <Form
                onSubmit={handleSignin}
                resolver={zodResolver(signinSchema)}
            // className="space-y-3"
            >
                <div>
                    <Input
                        name="username"
                        label="Username"
                        placeholder="Enter your username"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 py-2 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full  text-white font-semibold py-2 px-4 rounded-md"
                >
                    Sign In
                </Button>
            </Form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign Up
                </Link>
            </div>
        </AuthContent>
    );
};

export default Signin;
