import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select, Button, AuthContent } from "@components";
import { confirmEmailSchema, signupSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { clearEmailForOtp, confirmEmail, sendOtp, signup } from "@features";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Signup = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState("student");
    const { loading, emailForOtp } = useSelector((state) => state.auth);

    const handleSignup = (data) => {
        dispatch(signup(data));
    };

    // Show email confirmation form when pending
    if (emailForOtp) return <EmailConfirmationForm />;

    return (
        <AuthContent title="Sign Up" description="It's simple and easy!" className="w-[55%] my-10 ">
            <div className="flex ">
                <Form onSubmit={handleSignup} resolver={zodResolver(signupSchema)} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                        {/* Full Name Field */}
                        <div className="flex flex-col">
                            <Input name="name"
                                label="Name"
                                id="name"
                                placeholder="Enter your name" />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
                            <Input name="email"
                                label="Email" id="email"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* CNIC and Phone Number Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                        <div className="flex flex-col m-0 p-0">
                            <Input
                                name="cnic"
                                id="cnic"
                                label="CNIC NO"
                                placeholder="CNIC No. (without dashes)"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Phone Number"
                                name="phone"
                                placeholder="Enter your phone number (10-digits)"
                                optional
                            />
                        </div>
                    </div>

                    {/* Role Select */}
                    <div className="flex flex-col">
                        <label htmlFor="role" className="font-medium text-sm text-gray-700 mb-1">Your Role</label>
                        <Select
                            name="role"
                            id="role"
                            icon={<FaUser className="text-gray-400" />}
                            placeholder="Please select your role"
                            value={role}
                            onChange={({ target }) => setRole(target.value)}
                            options={[
                                { label: "Supervisor", value: "supervisor" },
                                { label: "Student", value: "student" }
                            ]}
                        />
                    </div>

                    {/* Roll No. for Students */}
                    <div className={`grid grid-cols-1 md:grid-cols-${role === "student" ? "2" : "1"} lg:gap-4`}>
                        {role === "student" && (
                            <div className="flex flex-col ">
                                <Input label="Roll No."
                                    name="rollNo"
                                    id="rollNo"
                                    placeholder="Enter roll number (e.g., 21SW066)" />
                            </div>
                        )}

                        {/* Password Field */}
                        <div className="flex flex-col">
                            <Input type="password"
                                label="Password"
                                name="password"
                                id="password"
                                placeholder="Create strong password" />
                        </div>
                    </div>

                    {/* Profile Photo Field */}
                    <div className="flex flex-col ">
                        <Input label="Profile Photo"
                            type="file" name="image"
                            accept=".jpg,.jpeg,.png" />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" isLoading={loading} className="w-full my-4">Sign Up</Button>
                </Form>
            </div>
            <div className="mt-2 text-center">
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
    };

    const handleResendOtp = () => {
        const requestBody = {
            email: emailForOtp,
            subject: "Signup Email Confirmation"
        };
        dispatch(sendOtp(requestBody));
    };

    return (
        <AuthContent title="Confirm Email" description="We just sent you an OTP to your email, confirm by entering below!"  className="w-[35%]" >
            <Form onSubmit={handleEmailConfirmation} resolver={zodResolver(confirmEmailSchema)}>
                <Input
                    type="number"
                    name="otp"
                    label="One Time Passcode"
                    placeholder="Enter a 6-digit OTP here"
                />

       <Button type="submit" isLoading={loading}  className="w-full mt-2">Confirm Now</Button>
            </Form>

            <div className="text-center mt-3">
                <small>
                    Didn't receive an OTP? <Button type="link" href="./" onClick={handleResendOtp}>Resend Now</Button>
                </small>
            </div>

            <div className="mt-4 text-center">
                <small>Want to sign in to your account? <Button href="/signin">Sign In</Button></small>
            </div>
        </AuthContent>
    );
};

export default Signup;
