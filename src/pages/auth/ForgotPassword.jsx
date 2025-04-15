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
        <AuthContent title="Forgot Password" description="Enter your account email address" className="w-[50%%]">
            <Form onSubmit={handleSendOtp} resolver={zodResolver(sendOtpSchema)}>
                <Input label="Email Address" name="email" placeholder="Enter your account email" />
                <Button type="submit" isLoading={loading} className="w-full my-4">Send OTP</Button>
            </Form>

            <div>
                <small>Want to signin your account? <Button href="/signin">Sign In</Button></small>
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
        <AuthContent title="Verify OTP" description="Verify the OTP code we just sent to your email address" className="w-[35%]" >
            <Form onSubmit={handleVerifyOtp} resolver={zodResolver(verifyOtpSchema)}>
                {/* <Input
                    type="number"
                    name="otp"
                    label="One Time Passcode"
                    placeholder="Enter a 6-digit OTP here"
                /> */}
                <div class="flex space-x-2">
                    <input
                        type="text"
                        name="otp"
                        maxlength="1"
                        inputmode="numeric"
                        class="w-12 h-12 text-center 
         border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-500"
                    />

                    <input type="number"
                        name="otp"
                        maxlength="1"
                        class="w-12 h-12 text-center border
                       border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-50" />

                    <input type="number"
                        name="otp"
                        maxlength="1"
                        class="w-12 h-12 text-center
                           border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-50" />

                    <input type="number"
                        name="otp"
                        maxlength="1"
                        class="w-12 h-12 text-center 
                  border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-50" />

                    <input type="number"
                        name="otp"
                        maxlength="1"
                        class="w-12 h-12 text-center
                  border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-50" />

                    <input type="number"
                        name="otp"
                        maxlength="1"
                        class="w-12 h-12 text-center
                  border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 
         focus:ring-primary focus:border-primary-50"/>
                </div>
                <Button type="submit" isLoading={loading} className="w-full mt-2">Verify OTP</Button>
            </Form>

            <div className="text-center mt-3">
                <small>
                    Didn't receive an OTP? <Button href="./" onClick={handleResendOtp}>Resend Now</Button>
                </small>
            </div>

            <div className=" text-center mt-3">
                <small>Want to signin your account? <Button href="/signin">Sign In</Button></small>
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
        <AuthContent title="Set a new Password" description="Set a new strong password for your account">
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

                <Button type="submit" isLoading={loading}>Save Password</Button>
            </Form>

            <div>
                <small>
                    Want to signin your account? <Button href="/signin">Sign In</Button>
                </small>
            </div>
        </AuthContent>
    )
}

export default ForgotPassword;
