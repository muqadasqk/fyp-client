import { Fragment, useEffect, useState } from 'react'
import { Button, ConfirmtionModal, Overlay } from '@components'
import { capitalize, formatDateTime } from '@utils'
import { readFile } from '@services'
import { deleteUser, updateStatus } from '@features'
import { FaLock, FaTrashAlt, FaUnlock, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const ViewUserDetails = ({ user, closeForm }) => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)

    const [src, setSrc] = useState(null)
    const [confirming, setConfirming] = useState(false)
    const [currentUser, setCurrentUser] = useState(user)

    useEffect(() => {
        const updated = users.find((u) => u._id === user._id)
        if (updated) {
            setCurrentUser(updated)
        }
    }, [users, user._id])

    useEffect(() => {
        (async () => {
            if (currentUser?.image) {
                setSrc(await readFile(currentUser.image).catch(() => null))
            }
        })()
    }, [currentUser.image])

    const handleDelete = async () => {
        const result = await dispatch(deleteUser(user._id))
        if (deleteUser.fulfilled.match(result)) {
            setConfirming(false); closeForm();
            return true;
        }
    }

    const handleApproveReject = async (id, statusCode) => {
        const result = await dispatch(updateStatus({ id, statusCode }));
        if (updateStatus.fulfilled.match(result)) {
            setConfirming(false); closeForm();
            return true;
        }
    }

    const handleLockUnlock = async (id, statusCode) => {
        const result = await dispatch(updateStatus({ id, statusCode }));
        if (updateStatus.fulfilled.match(result)) {
            setConfirming(false);
            return true;
        }

    }

    const FieldBlock = ({ label, value }) => (
        <div className="flex flex-col">
            <span className="text-xs text-secondary font-medium">{label}</span>
            <span className="text-sm text-primary font-semibold">{value ?? 'N/A'}</span>
        </div>
    )

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
                    model="users"
                    onConfirm={handleDelete}
                    onClose={setConfirming}
                />
            )}

            {confirming === "reject" && (
                <ConfirmtionModal
                    modalTitle="Rejecting Registration"
                    prompt="Are you sure you want to reject this user's registration?"
                    promptText="This action will deny access. Please confirm to proceed."
                    icon={<FaUserTimes className="text-2xl text-orange-500" />}
                    buttonColor="button-warning"
                    confirmBtnText="Reject"
                    model="users"
                    onConfirm={() => handleApproveReject(currentUser._id, 20002)}
                    onClose={setConfirming}
                />
            )}

            {confirming === "approve" && (
                <ConfirmtionModal
                    modalTitle="Approving Registration"
                    prompt="Do you want to approve this user’s registration?"
                    promptText="This will grant the user access to the FYP management system."
                    icon={<FaUserCheck className="text-2xl text-green-600" />}
                    buttonColor="button-success"
                    confirmBtnText="Approve"
                    model="users"
                    onConfirm={() => handleApproveReject(currentUser._id, 20001)}
                    onClose={setConfirming}
                />
            )}

            {confirming === "lock" && (
                <ConfirmtionModal
                    modalTitle="Locking User Access"
                    prompt="Are you sure you want to lock this user’s account?"
                    promptText="The user will no longer be able to access the FYP management system."
                    icon={<FaLock className="text-2xl text-blue-600" />}
                    // buttonColor="button-warning"
                    confirmBtnText="Lock"
                    model="users"
                    onConfirm={() => handleLockUnlock(currentUser._id, 20003)}
                    onClose={setConfirming}
                />
            )}

            {confirming === "unlock" && (
                <ConfirmtionModal
                    modalTitle="Unlocking User Access"
                    prompt="Do you want to unlock this user’s account?"
                    promptText="This will restore access to the FYP management system."
                    icon={<FaUnlock className="text-2xl text-blue-600" />}
                    // buttonColor="button-warning"
                    confirmBtnText="Unlock"
                    model="users"
                    onConfirm={() => handleLockUnlock(currentUser._id, 20004)}
                    onClose={setConfirming}
                />
            )}

            <Overlay
                onClose={closeForm}
                title="Account Information"
                width="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-4 bg-primary rounded-2xl items-stretch">
                        <div className="flex flex-col items-center gap-2 self-center sm:pr-2">
                            {src ? (
                                <img src={src} alt="User" className="w-32 h-32 rounded-full object-cover" />
                            ) : (
                                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-secondary border border-primary text-secondary italic">
                                    No image
                                </div>
                            )}
                            <div className="text-center">
                                <p className="text-primary font-semibold">{currentUser.name}</p>
                                <p className="text-secondary text-sm">{capitalize(currentUser.role)}</p>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FieldBlock label="Email" value={currentUser.email} />
                            <FieldBlock label="Phone" value={currentUser.phone} />
                            <FieldBlock label="CNIC" value={currentUser.cnic} />
                            <FieldBlock label="Status" value={capitalize(currentUser.status)} />
                            <FieldBlock label="Verified At" value={formatDateTime(currentUser.verifiedAt)} />
                            <FieldBlock label="Registered At" value={formatDateTime(currentUser.createdAt)} />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 border-t border-primary pt-4">
                        {currentUser.status == "approvalPending" && (
                            <>
                                <Button className="button-success" onClick={() => setConfirming("approve")}>
                                    Approve
                                </Button>
                                <Button className="button-warning" onClick={() => setConfirming("reject")}>
                                    Reject
                                </Button>
                            </>
                        )}

                        {currentUser.status == "active" && (
                            <Button onClick={() => setConfirming("lock")}>Lock Access</Button>
                        )}

                        {currentUser.status == "inactive" && (
                            <Button onClick={() => setConfirming("unlock")}>Unlock Access</Button>
                        )}

                        <Button className="button-danger" onClick={() => setConfirming("delete")}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Overlay>
        </Fragment>
    )
}

export default ViewUserDetails
