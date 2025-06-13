import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select, Button, AuthContent, ImageCropper, setValue } from "@components";
import { confirmEmailSchema, signupSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { clearEmailForOtp, confirmEmail, sendOtp, signup } from "@features";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import clsx from "clsx";

const Signup = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState("supervisor");
    const [imageToCrop, setImageToCrop] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { loading, emailForOtp } = useSelector((state) => state.auth);

    const handleSignup = (data) => {
        dispatch(signup(data));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImageToCrop(file);
    };

    const handleCropDone = async (base64Image) => {
        const blob = await (await fetch(base64Image)).blob();
        const file = new File([blob], "dp.png", { type: "image/png" });
        setImagePreview(URL.createObjectURL(file));
        setValue("image", file)
        setImageToCrop(null);
    };

    if (emailForOtp) return <EmailConfirmationForm />;

    return (
        <AuthContent title="Sign Up" description="It's simple and easy!" className="md:w-[50%] my-10">
            {imageToCrop && (
                <ImageCropper image={imageToCrop} onCropDone={handleCropDone} onClose={() => setImageToCrop(null)} />
            )}

            <div className="flex">
                <Form onSubmit={handleSignup} resolver={zodResolver(signupSchema)} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                        <Input name="name" label="Name" id="name" placeholder="Enter your name" />
                        <Input name="email" label="Email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                        <Input name="cnic" id="cnic" label="CNIC NO" placeholder="CNIC No. (without dashes)" />
                        <Input name="phone" label="Phone Number" placeholder="Enter your phone number (10-digits)" optional />
                    </div>

                    <Select
                        name="role"
                        label="Role"
                        placeholder="Please select your role"
                        value={role}
                        onChange={({ target }) => setRole(target.value)}
                        options={[
                            { label: "Supervisor", value: "supervisor" },
                            { label: "Student", value: "student" }
                        ]}
                    />

                    <div className={`grid grid-cols-1 md:grid-cols-${role === "student" ? "2" : "1"} lg:gap-4`}>
                        {role === "student" && (
                            <Input name="rollNo" id="rollNo" label="Roll No." placeholder="Enter roll number (e.g., 21SW066)" />
                        )}
                        <Input type="password" label="Password" name="password" id="password" placeholder="Create strong password" />
                    </div>

                    {/* {!imagePreview && (
                        <Input
                            label="Profile Photo"
                            type="file"
                            name="image"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                        />
                    )}

                    {imagePreview && (
                        <img src={imagePreview} className="rounded-full w-20 h-20 object-cover" />
                    )} */}

                    <div className={clsx("grid grid-cols-1 lg:gap-4", {
                        "md:grid-cols-2": imagePreview,
                        "md:grid-cols-1": !imagePreview,
                    })}>
                        <Input
                            label="Profile Photo"
                            type="file"
                            name="image"
                            id="image-upload"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                            optional
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="rounded-full mt-5 w-16 h-16 object-cover"
                            />
                        )}

                    </div>

                    <Button type="submit" isLoading={loading} className="w-full my-2">Sign Up</Button>
                </Form>
            </div>

            <div className="mt-4 text-center text-secondary">
                Got an account? <Button href="/signin">Sign In</Button>
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
        dispatch(sendOtp({ email: emailForOtp, subject: "Signup Email Confirmation" }));
    };

    return (
        <AuthContent title="Confirm Email" description="We just sent you an OTP to your email, confirm by entering below!" className="md:w-[50%] lg:w-[35%]">
            <Form onSubmit={handleEmailConfirmation} resolver={zodResolver(confirmEmailSchema)}>
                <Input type="number" name="otp" label="One Time Passcode" placeholder="Enter a 6-digit OTP here" />
                <Button type="submit" isLoading={loading} className="w-full mt-2">Confirm Now</Button>
            </Form>

            <div className="mt-4 text-center text-gray-600">
                Didn't receive an OTP? <Button href="./" onClick={handleResendOtp}>Resend Now</Button>
            </div>

            <div className="mt-1 text-center text-secondary">
                Want to sign in to your account? <Button href="/signin">Sign In</Button>
            </div>
        </AuthContent>
    );
};

export default Signup;
