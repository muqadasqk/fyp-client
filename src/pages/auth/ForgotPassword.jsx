import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@components";
import { sendOtpSchema, verifyOtpSchema, resetPasswordSchema } from "@schemas";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, sendOtp, verifyOtp } from "@features";
import { useEffect } from "react";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, emailForOtp, resetPasswordToken } = useSelector((state) => state.auth);

    const handleSendOtp = async (data) => {
        dispatch(sendOtp(data));
    };

    const handleVerifyOtp = async (data) => {
        dispatch(verifyOtp(data));
    };

    const handleSetPassword = async (data) => {
        const result = await dispatch(resetPassword(data));
        if (resetPassword.fulfilled.match(result)) {
            navigate("/signin", { replace: true });
        }
    };

    const renderSendOtpForm = () => (
        <div>
            <Helmet>
                <html lang="en" />
                <title>Forgot Password</title>
                <meta name="description" content="Enter your account email address" />
            </Helmet>

            <div>
                <h3>Forgot Password</h3>
                <p>Enter your account email address</p>

                <Form onSubmit={handleSendOtp} resolver={zodResolver(sendOtpSchema)}>
                    <Input label="Email Address" name="email" placeholder="Enter your account email" />
                    <Button type="submit" isLoading={loading}>Send OTP</Button>
                </Form>

                <div>
                    <small>Want to signin your account? <Link to="/signin">Sign In</Link></small>
                </div>
            </div>
        </div>
    );

    const renderVerifyOtpForm = () => (
        <div>
            <Helmet>
                <html lang="en" />
                <title>Verify OTP</title>
                <meta name="description" content="Verify the OTP code we just sent to your email address" />
            </Helmet>

            <div>
                <h3>Verify OTP</h3>
                <p>Verify the OTP code we just sent to your email address</p>

                <Form onSubmit={handleVerifyOtp} resolver={zodResolver(verifyOtpSchema)}>
                    <Input label="One Time Passcode" type="number" name="otp" placeholder="Enter a 6-digit OTP here" />

                    <Button type="submit" isLoading={loading}>Verify OTP</Button>
                </Form>

                <div className="text-center mt-3">
                    <small>Didn't receive an OTP? <Link to="./" onClick={() => dispatch(sendOtp({ email: emailForOtp }))}>Resend Now</Link></small>
                </div>

                <div>
                    <small>Want to signin your account? <Link to="/signin">Sign In</Link></small>
                </div>
            </div>
        </div>
    );

    const renderSetPasswordForm = () => (
        <div>
            <Helmet>
                <html lang="en" />
                <title>Set a new Password</title>
                <meta name="description" content="Set a new strong password for your account" />
            </Helmet>

            <div>
                <h3>Set a new Password</h3>
                <p>Set a new strong password for your account</p>

                <Form onSubmit={handleSetPassword} resolver={zodResolver(resetPasswordSchema)}>
                    <Input label="New Password" name="password" type="password" placeholder="Create a new password" />
                    <Input label="Confirm Password" name="confirmationPassword" type="password" placeholder="Confirm your new password" />

                    <Button type="submit" isLoading={loading}>Save Password</Button>
                </Form>

                <div>
                    <small>Want to signin your account? <Link to="/signin">Sign In</Link></small>
                </div>
            </div>
        </div>
    );

    const renderForm = () => {
        if (resetPasswordToken) return renderSetPasswordForm();
        else if (emailForOtp) return renderVerifyOtpForm();
        return renderSendOtpForm();
    };

    return renderForm();
};

export default ForgotPassword;
