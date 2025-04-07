import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContent, Button, Form, Input } from "@components";
import { signinSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "@features";

const Signin = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSignin = async (data) => {
        dispatch(signin(data));
    };

    return (
        <AuthContent title="Sign In" description="Welcome back! Please enter your credentials to continue">
            <Form onSubmit={handleSignin} resolver={zodResolver(signinSchema)}>
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

                <div>
                    <small><Button href="/forgot-password">Forgot Password?</Button></small>
                </div>

                <Button type="submit" isLoading={loading} >Sign In</Button>
            </Form>

            <div>
                <small>Don't have an account? <Button href="/signup">Sign Up</Button></small>
            </div>
        </AuthContent>
    );
};

export default Signin;
