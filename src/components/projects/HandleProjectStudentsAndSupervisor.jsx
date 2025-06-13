import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Overlay, Select, TextArea, Input } from "@components";
import { uploadProposalFileSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers } from "@features";

const HandleProjectStudentsAndSupervisor = ({ project, handleSubmit, closeForm }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.projects);
    const { users } = useSelector((state) => state.users);

    const supervisors = users.filter(user => user.role == "supervisor");
    const students = users.filter(user => user.role == "student");

    const [holders, setHolders] = useState({
        supervisor: project?.supervisor?._id ?? null,
        lead: project?.lead?._id ?? null,
        memberOne: project?.memberOne?._id ?? null,
        memberTwo: project?.memberTwo?._id ?? null
    });

    console.log(holders);

    useEffect(() => {
        dispatch(retrieveUsers({ page: {}, status: "active" }));
    }, [])

    return (
        <Overlay
            title="Handle Project Members and Supervisor"
            width="w-[90%] sm:w-[70%] md:w-[50%]"
            zIndex="z-50"
            onClose={() => closeForm(true)}
        >
            <div className="flex">
                <Form onSubmit={handleSubmit} resolver={zodResolver(uploadProposalFileSchema)}>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                        <Select
                            name="supervisor"
                            label="You can change the supervisor"
                            placeholder="Please choose a supervisor"
                            value={holders.supervisor}
                            options={supervisors.map((supervisor) => ({
                                value: supervisor._id,
                                label: supervisor.name,
                            }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                        <Select
                            name="lead"
                            label="Make an other member as a lead"
                            placeholder="Please choose a student"
                            value={holders.lead}
                            options={students.map((student) => ({
                                value: student._id,
                                label: student.name,
                            }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                        <Select
                            name="memberOne"
                            label="You can remove or add any studnet as a 2nd member"
                            placeholder="Please choose a student"
                            value={holders.memberOne}
                            options={students.map((student) => ({
                                value: student._id,
                                label: student.name,
                            }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                        <Select
                            name="memberTwo"
                            label="You can remove or add any studnet as a 3rd member"
                            placeholder="Please choose a student"
                            value={holders.memberTwo}
                            options={students.map((student) => ({
                                value: student._id,
                                label: student.name,
                            }))}
                        />
                    </div>

                    <Button type="submit" isLoading={loading} className="w-full mt-3">Save changes</Button>
                </Form>
            </div>
        </Overlay>
    )
};

export default HandleProjectStudentsAndSupervisor;
