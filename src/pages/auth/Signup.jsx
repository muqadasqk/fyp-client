import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select, Button } from "@components";
import { confirmEmailSchema, signupSchema } from "@schemas";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { clearEmailForOtp, confirmEmail, sendOtp, signup } from "@features";
import { useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const { loading, emailForOtp } = useSelector((state) => state.auth);

  const handleSignup = async (data) => {
    dispatch(signup(data));
  };

  const handleEmailConfirmation = async (data) => {
    const result = await dispatch(confirmEmail(data));
    if (confirmEmail.fulfilled.match(result)) {
      dispatch(clearEmailForOtp());
      navigate("/signin", { replace: true });
    }
  };

  const renderEmailconfirmationForm = () => {
    return (
      <div>
        <Helmet>
          <html lang="en" />
          <title>Confirm Email</title>
          <meta name="description" content="We just sent you an OTP to your email, confirm by entering below!" />
        </Helmet>

        <div>
          <h3>Confirm Email</h3>
          <p>We just sent you an OTP to your email, confirm by entering it below!</p>

          <Form onSubmit={handleEmailConfirmation} resolver={zodResolver(confirmEmailSchema)}>
            <Input label="One Time Passcode" type="number" name="otp" placeholder="Enter a 6-digit OTP here" />
            <Input name="email" type="hidden" value={emailForOtp} />

            <button type="submit" disabled={loading}>Confirm</button>
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
  }

  const renderSignupForm = () => {
    return (
      <div>
        <Helmet>
          <html lang="en" />
          <title>Sign Up</title>
          <meta name="description" content="Welcome back! Please enter your credentials to continue" />
        </Helmet>

        <div>
          <h3>Sign Up</h3>
          <p>It's simple and easy</p>

          <Form onSubmit={handleSignup} resolver={zodResolver(signupSchema)} encType="multipart/form-data">
            <Input label="Full Name" name="name" placeholder="Enter your name" />
            <Input label="Email Address" name="email" placeholder="Enter your email" />
            <Select label="Your Role" name="role" onChange={({ target }) => setRole(target.value)} options={[
              { label: "Supervisor", value: "supervisor" },
              { label: "Student", value: "student" }
            ]} value={role} placeholder="Please select your role" />
            <Input label="NIC No." name="nic" placeholder="Enter your nic number" />
            {role === "student" && <Input label="Roll No." name="rollNo" placeholder="Enter your roll number" />}
            <Input label="Password" name="password" type="password" placeholder="Create a strong password" />
            <Input label="Profile Photo" type="file" name="image" accept=".jpg,.jpeg,.png" />

            <Button type="submit" isLoading={loading} >Sign Up</Button>
          </Form>

          <div>
            <small>Have an account? <Link to="/signin">Sign In</Link></small>
          </div>
        </div>
      </div>
    );
  }

  return emailForOtp
    ? renderEmailconfirmationForm()
    : renderSignupForm();
};

export default Signup;
