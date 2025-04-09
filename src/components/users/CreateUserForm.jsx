import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Overlay } from "@components";
import { createUserSchema } from "@schemas";
import { useDispatch } from "react-redux";
import { createUser } from "@features";
import { FaCross } from "react-icons/fa";

const CreateUserForm = ({ role, closeForm, isLoading }) => {
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        if (data.get("image") === "undefined") data.delete("image");

        data.append("role", role);
        const result = await dispatch(createUser(data));
        if (createUser.fulfilled.match(result)) closeForm(true);
    }

    return (
        <Overlay>
            <div>
                <Button type="button" onClick={() => closeForm(true)}>
                    <FaCross /> Close
                </Button>

                <h2>Create a {role}</h2>
                <Form onSubmit={onSubmit} resolver={zodResolver(createUserSchema)} encType="multipart/form-data">
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
                        type="file"
                        name="image"
                        label="Profile Photo"
                        accept=".jpg,.jpeg,.png"
                        optional
                    />

                    <Button type="submit" isLoading={isLoading}>Create</Button>
                </Form>
            </div>
        </Overlay>
    )
};

export default CreateUserForm;
