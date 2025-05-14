import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Overlay } from "@components";
import { createUserSchema } from "@schemas";
import { useDispatch } from "react-redux";
import { createUser } from "@features";


const CreateUserForm = ({ role, closeForm, isLoading }) => {
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        if (data.get("image") === "undefined") data.delete("image");

        data.append("role", role);
        const result = await dispatch(createUser(data));
        if (createUser.fulfilled.match(result)) closeForm(true);
    }

    return (
        <Overlay dasboardSpecific onClose={() => closeForm(true)} title={`Create ${role}`} width="w-[90%] sm:w-[70%] md:w-[50%]">
            <div className="flex">
                <Form onSubmit={onSubmit} resolver={zodResolver(createUserSchema)} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 w-full">
                        <div className="flex flex-col">
                            <Input
                                name="name"
                                label="Full Name"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                        <div className="flex flex-col">
                            <Input
                                name="cnic"
                                label="CNIC No."
                                placeholder="CNIC No. (without dashes)"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Input
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter your phone number (10-digits)"
                                optional
                            />
                        </div>
                    </div>
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
                    <Button type="submit" isLoading={isLoading} className="w-full mt-3">Create</Button>
                </Form>
            </div>
        </Overlay>
    )
};

export default CreateUserForm;
