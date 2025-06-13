import React, { Fragment, useEffect, useState } from 'react'
import { Button, ConfirmtionModal, HandleProjectStudentsAndSupervisor, Overlay } from '@components'
import { readFile } from '@services'
import { capEach, firstLetter, formatDateTime, showSuccessToast, splitCamelCase } from '@utils'
import { FaCheck, FaEdit, FaPen } from 'react-icons/fa';
import { updateProject } from '@features';
import { useDispatch, useSelector } from 'react-redux';

const ViewProjectDetails = ({ project, closeForm }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [images, setImages] = useState({
        lead: null, memberOne: null, memberTwo: null, supervisor: null,
    });
    const [confirming, setConfirming] = useState(false);

    const handleStatusCompleted = async () => {
        const data = {
            id: project._id,
            formData: { status: "completed" },
            showSuccessToast: false
        }

        const result = await dispatch(updateProject(data));
        if (updateProject.fulfilled.match(result)) {
            showSuccessToast("The project was marked completed");
            setConfirming(false); closeForm();
            return true;
        };
    }
    const handleSubmit = async (d) => {
        const data = {
            id: project._id,
            formData: { ...d },
            showSuccessToast: false
        }

        const result = await dispatch(updateProject(data));
        if (updateProject.fulfilled.match(result)) {
            showSuccessToast("The project was marked completed");
            setConfirming(false); closeForm();
            return true;
        };
    }

    useEffect(() => {
        (async () => {
            const [lead, memberOne, memberTwo, supervisor] = await Promise.all([
                project?.lead?.image ? readFile(project.lead.image).catch(() => null) : null,
                project?.memberOne?.image ? readFile(project.memberOne.image).catch(() => null) : null,
                project?.memberTwo?.image ? readFile(project.memberTwo.image).catch(() => null) : null,
                project?.supervisor?.image ? readFile(project.supervisor.image).catch(() => null) : null,
            ]);

            setImages({ lead, memberOne, memberTwo, supervisor });
        })()
    }, [project]);

    const FieldBlock = ({ label, value }) => (
        <div className="flex flex-col gap-1">
            <span className="text-sm text-primary font-medium">{label}</span>
            <p className="text-sm text-secondary whitespace-pre-line">{splitCamelCase(value) || "N/A"}</p>
        </div>
    );

    return (
        <Fragment>
            {confirming === "completed" && (
                <ConfirmtionModal
                    modalTitle="Marking the Project as Completed"
                    prompt="Are you sure you want to mark this project as completed?"
                    promptText="This action cannot be undone. Please confirm to proceed."
                    icon={<FaCheck className="text-2xl text-green-600" />}
                    buttonColor="button-success"
                    confirmBtnText="Mark Completed"
                    model="projects"
                    onConfirm={handleStatusCompleted}
                    onClose={setConfirming}
                />
            )}

            {confirming === "edit" && (
                <HandleProjectStudentsAndSupervisor
                    project={project}
                    handleSubmit={handleSubmit}
                    closeForm={() => setConfirming(false)}
                />
            )}

            <Overlay
                onClose={() => closeForm(true)}
                title={capEach(project.title)}
                width="w-[90%] sm:w-[80%] lg:w-[70%]"
            >

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PersonBlock title="Team Leader" person={project?.lead} image={images.lead} />
                        <PersonBlock title="Group Member One" person={project?.memberOne} image={images.memberOne} />
                        <PersonBlock title="Group Member Two" person={project?.memberTwo} image={images.memberTwo} />
                        <PersonBlock title="Supervisor" person={project?.supervisor} image={images.supervisor} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary p-5 border border-primary rounded-xl">
                        <FieldBlock label="Title" value={project.title} />
                        <FieldBlock label="Type" value={project.type} />
                        <FieldBlock label="Category" value={project.category} />
                        <FieldBlock label="Status" value={project.status} />
                        <FieldBlock label="Created At" value={formatDateTime(project.createdAt)} />
                        <FieldBlock label="Updated At" value={formatDateTime(project.updatedAt)} />
                    </div>

                    <div className="bg-primary border border-primary p-5 rounded-xl">
                        <FieldBlock label="Abstract" value={project.abstract} />
                    </div>

                    {user.role == "admin" && project.status != "completed" && (
                        <div className="flex flex-wrap justify-end gap-3 border-t border-primary pt-4">
                            {project.status == "initialized" && (
                                <Button className="button-success" onClick={() => setConfirming("completed")}>
                                    <FaCheck /> Mark Completed
                                </Button>
                            )}
                            {project.status == "underDevelopment" && (
                                <Button className="button-primary" onClick={() => setConfirming("edit")}>
                                    <FaEdit /> Edit
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Overlay>
        </Fragment>
    );
};


const PersonBlock = ({ title, person, image }) => {
    return (
        <div className="flex bg-primary border border-primary rounded-2xl overflow-hidden w-full max-w-md">
            <div className="flex items-center justify-center w-36 h-36 shrink-0">
                {image ? (
                    <img src={image} alt={`${title} picture`} className="w-32 h-32 object-cover rounded-full" />
                ) : (
                    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary-hover border border-primary">
                        {!person ? (
                            <span className="text-secondary text-sm italic">No Image</span>
                        ) : (
                            <span className="text-secondary text-3xl font-semibold">
                                {firstLetter(person.name)}
                            </span>
                        )}
                    </div>
                )}
            </div>


            <div className="p-4 flex flex-col justify-center w-full">
                <p className="font-semibold text-primary mb-1">{title}</p>

                {person ? (
                    <div className="space-y-1 text-sm">
                        {person.name && (
                            <div><span className="font-medium text-secondary">Name:</span> <span className="text-primary font-semibold">{person.name}</span></div>
                        )}
                        {title != "Supervisor" && person.rollNo && (
                            <div><span className="font-medium text-secondary">Roll No:</span> <span className="text-primary font-semibold">{person.rollNo}</span></div>
                        )}
                        {person.phone && (
                            <div><span className="font-medium text-secondary">Email:</span> <span className="text-primary font-semibold">{person.email}</span></div>
                        )}
                    </div>
                ) : (
                    <p className="italic text-sm text-secondary">Yet not assigned</p>
                )}
            </div>
        </div>
    );
};


export default ViewProjectDetails;
