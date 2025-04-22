import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContent, Button, Form, Input } from "@components";
import { sendOtpSchema, verifyOtpSchema, resetPasswordSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, sendOtp, verifyOtp } from "@features";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading, emailForOtp, resetPasswordToken } = useSelector((state) => state.auth);

    const handleSendOtp = async (data) => {
        data.append("subject", "Forgot Password | Account Email Verification");
        dispatch(sendOtp(data));
    };

    if (resetPasswordToken) return <SetPasswordForm />
    if (emailForOtp) return <VerifyOtpForm />

    return (
        <AuthContent title="Forgot Password" description="Enter your account email address" className="md:w-[50%%] lg:w-[35%]">
            <Form onSubmit={handleSendOtp} resolver={zodResolver(sendOtpSchema)}>
                <Input label="Email Address" name="email" placeholder="Enter your account email" />
                <Button type="submit" isLoading={loading} className="w-full mt-2">Send OTP</Button>
            </Form>

            <div className="mt-4 text-center text-gray-600">
                Want to signin your account? <Button href="/signin">Sign In</Button>
            </div>
        </AuthContent>
    )
};

const VerifyOtpForm = () => {
    const dispatch = useDispatch();
    const { loading, emailForOtp } = useSelector((state) => state.auth);

    const handleVerifyOtp = async (data) => {
        data.append("email", emailForOtp);
        dispatch(verifyOtp(data));
    };

    const handleResendOtp = () => {
        const requestBody = {
            email: emailForOtp,
            subject: "Forgot Password | Account Email Verification",
        }
        dispatch(sendOtp(requestBody));
    }

    return (
        <AuthContent title="Verify OTP" description="Verify the OTP code we just sent to your email address" className="md:w-[50%%] lg:w-[35%]" >
            <Form onSubmit={handleVerifyOtp} resolver={zodResolver(verifyOtpSchema)}>
                <Input
                    type="number"
                    name="otp"
                    label="One Time Passcode"
                    placeholder="Enter a 6-digit OTP here"
                />
                <Button type="submit" isLoading={loading} className="w-full mt-2">Verify OTP</Button>
            </Form>

            <div className="mt-4 text-center text-gray-600">
                Didn't receive an OTP? <Button href="./" onClick={handleResendOtp}>Resend Now</Button>
            </div>

            <div className="mt-1 text-center text-gray-600">
                Want to signin your account? <Button href="/signin">Sign In</Button>
            </div>
        </AuthContent>
    )
};

const SetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSetPassword = async (data) => {
        const result = await dispatch(resetPassword(data));
        if (resetPassword.fulfilled.match(result)) {
            navigate("/signin", { replace: true });
        }
    };

    return (
        <AuthContent title="Set a new Password" description="Set a new strong password for your account" className="md:w-[50%] lg:w-[35%]">
            <Form onSubmit={handleSetPassword} resolver={zodResolver(resetPasswordSchema)}>
                <Input
                    type="password"
                    name="password"
                    label="New Password"
                    placeholder="Create a new password"
                />
                <Input
                    type="password"
                    name="confirmationPassword"
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                />

                <Button type="submit" isLoading={loading} className="w-full mt-2">Save Password</Button>
            </Form>

            <div className="mt-4 text-center text-gray-600">
                Want to signin your account? <Button href="/signin">Sign In</Button>
            </div>
        </AuthContent>
    )
}

export default ForgotPassword;
