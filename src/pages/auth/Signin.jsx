import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@components";
import { signinSchema } from "@schemas";
import { BsPerson, BsLock } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "@features";

const Signin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSignin = async (data) => {
    dispatch(signin(data));
  };

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>Sign In</title>
        <meta name="description" content="Welcome back! Please enter your credentials to continue" />
      </Helmet>

      <div>
        <h3>Sign In</h3>
        <p >Welcome back! Please enter your credentials to continue</p>

        <Form onSubmit={handleSignin} resolver={zodResolver(signinSchema)}>
          <Input label="Username" name="username" placeholder="Enter your username" />
          <Input label="Password" name="password" type="password" placeholder="Enter your password" />

          <div>
            <small><Link to="/forgot-password">Forgot Password?</Link></small>
          </div>

          <Button type="submit" isLoading={loading} >Sign In</Button>
        </Form>

        <div>
          <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Signin;
