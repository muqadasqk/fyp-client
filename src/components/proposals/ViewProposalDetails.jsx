import React, { Fragment, useEffect, useState } from 'react'
import { Button, ConfirmtionModal, HandleProposalStatusForm, Overlay } from '@components'
import { readFile } from '@services'
import { capitalize, formatDateTime } from '@utils'
import { FaTrashAlt, FaUserTimes } from 'react-icons/fa';
import { deleteProposal, updateProposal } from '@features';
import { useDispatch, useSelector } from 'react-redux';

const ViewProposalDetails = ({ proposal, closeForm }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [images, setImages] = useState({
        lead: null, memberOne: null, memberTwo: null, supervisor: null,
    });
    const [confirming, setConfirming] = useState(false);

    const handleDelete = async () => {
        const result = await dispatch(deleteProposal(proposal._id))
        if (deleteProposal.fulfilled.match(result)) {
            setConfirming(false); closeForm();
            return true;
        }
    }

    const handleAction = async (data) => {
        const result = await dispatch(updateProposal({ id: proposal._id, formData: data }));
        if (updateProposal.fulfilled.match(result)) {
            setConfirming(false); closeForm();
        };
    }

    useEffect(() => {
        (async () => {
            const [lead, memberOne, memberTwo, supervisor] = await Promise.all([
                proposal?.lead?.image ? readFile(proposal.lead.image).catch(() => null) : null,
                proposal?.memberOne?.image ? readFile(proposal.memberOne.image).catch(() => null) : null,
                proposal?.memberTwo?.image ? readFile(proposal.memberTwo.image).catch(() => null) : null,
                proposal?.supervisor?.image ? readFile(proposal.supervisor.image).catch(() => null) : null,
            ]);

            setImages({ lead, memberOne, memberTwo, supervisor });
        })()
    }, [proposal]);

    const FieldBlock = ({ label, value }) => (
        <div className="flex flex-col gap-1">
            <span className="text-sm text-primary font-medium">{label}</span>
            <p className="text-sm text-secondary whitespace-pre-line">{value || "N/A"}</p>
        </div>
    );

    return (
        <Fragment>
            {confirming === "delete" && (
                <ConfirmtionModal
                    modalTitle="Deleting User"
                    prompt="Are you sure you want to delete this user?"
                    promptText="This action cannot be undone. Please confirm to proceed."
                    icon={<FaTrashAlt className="text-2xl text-red-600" />}
                    buttonColor="button-danger"
                    confirmBtnText="Delete"
                    model="proposals"
                    onConfirm={handleDelete}
                    onClose={setConfirming}
                />
            )}

            {confirming === "action" && (
                <HandleProposalStatusForm handleAction={handleAction} closeForm={() => setConfirming(false)} />
            )}

            <Overlay
                onClose={() => closeForm(true)}
                title={capitalize(proposal.title)}
                width="w-[90%] sm:w-[80%] lg:w-[70%]"
            >

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PersonBlock title="Team Leader" person={proposal?.lead} image={images.lead} />
                        <PersonBlock title="Group Member One" person={proposal?.memberOne} image={images.memberOne} />
                        <PersonBlock title="Group Member Two" person={proposal?.memberTwo} image={images.memberTwo} />
                        <PersonBlock title="Supervisor" person={proposal?.supervisor} image={images.supervisor} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary p-5 border border-primary rounded-xl">
                        <FieldBlock label="Title" value={proposal.title} />
                        <FieldBlock label="Type" value={proposal.type} />
                        <FieldBlock label="Category" value={proposal.category} />
                        <FieldBlock label="Status" value={proposal.status} />
                        <FieldBlock label="Created At" value={formatDateTime(proposal.createdAt)} />
                        <FieldBlock label="Updated At" value={formatDateTime(proposal.updatedAt)} />
                    </div>

                    <div className="bg-primary border border-primary p-5 rounded-xl">
                        <FieldBlock label="Remarks from Admin" value={proposal.remarks} />
                    </div>

                    <div className="bg-primary border border-primary p-5 rounded-xl">
                        <FieldBlock label="Abstract" value={proposal.abstract} />
                    </div>

                    {user.role == "admin" && (
                        <div className="flex flex-wrap justify-end gap-3 border-t border-primary pt-4">
                            {proposal.status == "pending" && (
                                <Button onClick={() => setConfirming("action")}>Take Action</Button>
                            )}

                            <Button className="button-danger" onClick={() => setConfirming("delete")}>
                                Delete
                            </Button>
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
            <div className="bg-secondary flex items-center justify-center w-36 h-36 shrink-0">
                {image ? (
                    <img src={image} alt={`${title} picture`} className="w-32 h-32 object-cover rounded-full" />
                ) : (
                    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary-hover border border-primary">
                        <span className="text-secondary text-sm italic">No image</span>
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
                        {person.rollNo && (
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


export default ViewProposalDetails;
