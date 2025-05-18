import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Overlay, Select, TextArea, Input } from "@components";
import { StatusHandleSchema } from "@schemas";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers } from "@features";

const HandleProposalStatusForm = ({ closeForm, handleAction }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const { loading } = useSelector((state) => state.proposals);
    const supervisors = users.filter((user) => user.status == "active");
    const [status, setStatus] = useState();

    useEffect(() => {
        dispatch(retrieveUsers({ role: "supervisor" }));
    }, [])

    return (
        <Overlay
            title="Handle Proposal Acceptance"
            width="w-[90%] sm:w-[70%] md:w-[50%]"
            zIndex="z-50"
            onClose={() => closeForm(true)}
        >
            <div className="flex">
                <Form onSubmit={handleAction} resolver={zodResolver(StatusHandleSchema)}>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4 w-full">
                        <div className="flex flex-col">
                            <Select
                                name="statusCode"
                                label="Proposal Status"
                                placeholder="Please choose a status"
                                onChange={({ target }) => setStatus(target.value)}
                                options={[
                                    { value: "20001", label: "Accept" },
                                    { value: "20002", label: "Accept with conditions" },
                                    { value: "20003", label: "Reject" },
                                ]}
                            />
                        </div>
                    </div>

                    {status && status !== "20003" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                            <Select
                                name="supervisor"
                                label="Assign to the Supervisor"
                                placeholder="Please choose a supervisor"
                                options={supervisors.map((supervisor) => ({
                                    value: supervisor._id,
                                    label: supervisor.name,
                                }))}
                            />

                            <Input
                                name="pid"
                                label="Create Project ID"
                                placeholder="Create Project ID  e.g., SW001"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4">
                        <TextArea
                            name="remarks"
                            label="Remarks"
                            placeholder="Remarks must be between (5-350 words)"
                            rows={10}
                        />
                    </div>

                    <Button type="submit" isLoading={loading} className="w-full mt-3">Finish</Button>
                </Form>
            </div>
        </Overlay>
    )
};

export default HandleProposalStatusForm;
