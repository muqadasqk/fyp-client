import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Overlay, Select, TextArea } from "@components";
import { createProposalSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { createProposal, retrieveUsers } from "@features";
import { useEffect, useState } from "react";

const CreateProposalForm = ({ closeForm, isLoading }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const [memberOne, setMemberOne] = useState("");
    const authenticatedUser = useSelector((state) => state.auth.user);

    const students = users.filter((user) => user.role === "student" && user._id !== authenticatedUser._id);
    const filteredStudents = students.filter((student) => student._id !== memberOne);

    const onSubmit = async (data) => {
        const result = await dispatch(createProposal(data));
        if (createProposal.fulfilled.match(result)) closeForm(true);
    };

    useEffect(() => {
        dispatch(retrieveUsers({ page: {}, role: "student" }));
    }, []);

    return (
        <Overlay
            dasboardSpecific
            onClose={() => closeForm(true)}
            title="Pitch an idea!"
            width="w-[90%] sm:w-[70%] md:w-[50%]"
        >
            <Form onSubmit={onSubmit} resolver={zodResolver(createProposalSchema)}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                    <Input
                        name="title"
                        label="Idea Title"
                        placeholder="Enter your idea title"
                    />
                </div>

                <div className={memberOne ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "grid grid-cols-1"}>
                    <Select
                        name="memberOne"
                        label="Member One"
                        placeholder="Please choose a member"
                        onChange={({ target }) => setMemberOne(target.value)}
                        options={students.map((student) => ({
                            value: student._id,
                            label: `${student.name} - (${student.rollNo})`,
                        }))}
                    />

                    {memberOne && (
                        <Select
                            name="memberTwo"
                            label="Member Two"
                            placeholder="Please choose a member"
                            options={filteredStudents.map((student) => ({
                                value: student._id,
                                label: `${student.name} - (${student.rollNo})`,
                            }))}
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                    <Input
                        name="category"
                        label="Category"
                        placeholder="Type category e.g., website, mobile app, etc."
                    />
                    <Select
                        name="type"
                        label="Type"
                        placeholder="Please Choose a type"
                        options={[
                            { value: "new", label: "New" },
                            { value: "modifiedOrExtension", label: "Modified Or Extension" },
                            { value: "researchBased", label: "Research Based" },
                        ]}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                    <TextArea
                        name="abstract"
                        label="Abstract"
                        placeholder="Enter your abstract (200-350 words)"
                        rows={10}
                    />
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full mt-4">
                    Hit Pitch
                </Button>
            </Form>
        </Overlay>
    );
};

export default CreateProposalForm;
