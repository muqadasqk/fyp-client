import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select, Button, AuthContent } from "@components";
import { confirmEmailSchema, signupSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { clearEmailForOtp, confirmEmail, sendOtp, signup } from "@features";
import { useState } from "react";

const Signup = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState("student");
    const { loading, emailForOtp } = useSelector((state) => state.auth);

    const handleSignup = (data) => {
        dispatch(signup(data));
    };

    // show email confirmation form when pending
    if (emailForOtp) return <EmailConfirmationForm />

    return (
        <AuthContent title="Sign Up" description="It's simple and easy!">
            <Form onSubmit={handleSignup} resolver={zodResolver(signupSchema)} encType="multipart/form-data">
                <Input
                    name="name"
                    label="Full Name"
                    placeholder="Enter your name"
                />
                <Input
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                />
                <Select
                    name="role"
                    label="Your Role"
                    placeholder="Please select your role"
                    value={role}
                    onChange={({ target }) => setRole(target.value)}
                    options={[
                        { label: "Supervisor", value: "supervisor" },
                        { label: "Student", value: "student" }
                    ]}
                />
                <Input
                    name="cnic"
                    label="CNIC No."
                    placeholder="Enter your nic number (without dashes)"
                />
                <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number (10-digits)"
                    optional
                />
                {role === "student" && <Input
                    name="rollNo"
                    label="Roll No."
                    placeholder="Enter your roll number (e.g., 21SW066)"
                />}
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Create a strong password"
                />
                <Input
                    type="file"
                    name="image"
                    label="Profile Photo"
                    accept=".jpg,.jpeg,.png"
                />

                <Button type="submit" isLoading={loading} >Sign Up</Button>
            </Form>

            <div>
                <small>Have an account? <Button href="/signin">Sign In</Button></small>
            </div>
        </AuthContent>
    );
};

const EmailConfirmationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, emailForOtp } = useSelector((state) => state.auth);

    const handleEmailConfirmation = async (data) => {
        data.append("email", emailForOtp);
        const result = await dispatch(confirmEmail(data));
        if (confirmEmail.fulfilled.match(result)) {
            dispatch(clearEmailForOtp());
            navigate("/signin", { replace: true });
        }
    }

    const handleResendtOtp = () => {
        const requestBody = {
            email: emailForOtp,
            subject: "Signup Email Confirmation"
        }
        dispatch(sendOtp(requestBody));
    }

    return (
        <AuthContent title="Confirm Email" description="We just sent you an OTP to your email, confirm by entering below!">
            <Form onSubmit={handleEmailConfirmation} resolver={zodResolver(confirmEmailSchema)}>
                <Input
                    type="number"
                    name="otp"
                    label="One Time Passcode"
                    placeholder="Enter a 6-digit OTP here"
                />

                <Button type="submit" isLoading={loading}>Confirm Now</Button>
            </Form>

            <div className="text-center mt-3">
                <small>
                    Didn't receive an OTP? <Button type="link" href="./" onClick={handleResendtOtp}>Resend Now</Button>
                </small>
            </div>

            <div>
                <small>Want to signin your account? <Button href="/signin">Sign In</Button></small>
            </div>
        </AuthContent>
    );
}

export default Signup;
