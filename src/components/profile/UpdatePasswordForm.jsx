import { Button, Form, Input, resetForm } from "@components";
import { updatePassword } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";

const UpdatePasswordForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.users);

    const handlePasswordUpdate = async (data) => {
        const result = await dispatch(updatePassword(data));
        if (updatePassword.fulfilled.match(result)) resetForm();
    };

    return (
        <div>
            <h1>Update Password</h1>
            <div>
                <Form onSubmit={handlePasswordUpdate} resolver={zodResolver(updatePasswordSchema)}>
                    <Input
                        type="password"
                        name="currentPassword"
                        label="Current Password"
                        placeholder="Enter your current password"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="New Password"
                        placeholder="Create a new strong password"
                    />

                    <Button type="submit" isLoading={loading}>Update Now</Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdatePasswordForm;
