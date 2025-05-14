import { Listing } from "@components";
import { Button, CreateUserForm, DashboardContent } from "@components";
import { retrieveUsers, updateStatus } from "@features";
import { useState } from "react";
import { FaLock, FaLockOpen, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ManageAccounts = () => {
    const dispatch = useDispatch();
    const { users, pagination, loading } = useSelector((state) => state.users);
    const [selectRoleForm, setSelectRoleForm] = useState(false);
    const [role, setRole] = useState(null);

    const handle = (id, action) => {
        let statusCode;
        switch (action) {
            case "Approve": statusCode = 20001; break;
            case "Reject": statusCode = 20002; break;
            case "Lock": statusCode = 20003; break;
            case "Unlock": statusCode = 20004; break;
        }

        dispatch(updateStatus({ id, statusCode }));
    }

    const handleRoleForm = (role) => {
        setRole(role);
        setSelectRoleForm(false);
    }

    return (
        <DashboardContent isLoading={loading} title="Manage Accounts" description="Manage Supervisor and Student Accounts | Approve/Reject account requests">
            <div className="relative mb-5">
                <div className="relative">
                    <Button type="button" className="" onClick={() => setSelectRoleForm(!selectRoleForm)}>
                        {selectRoleForm ? <FaTimes /> : <FaPlus />} Create new
                    </Button>

                    {selectRoleForm && (
                        <div className="absolute top-12 min-w-36 bg-primary border border-primary rounded">
                            <div onClick={() => handleRoleForm("admin")} className="cursor-pointer p-2 rounded transition hover:bg-primary-hover">An Admin</div>
                            <div onClick={() => handleRoleForm("supervisor")} className="cursor-pointer p-2 rounded transition hover:bg-primary-hover">A Supervisor</div>
                            <div onClick={() => handleRoleForm("student")} className="cursor-pointer p-2 rounded transition hover:bg-primary-hover ">A Student</div>
                        </div>)
                    }
                </div>
            </div>

            {role && <CreateUserForm isLoading={loading} role={role} closeForm={(v) => setRole(v && null)} />}

            {/* Listing here */}
            <Listing
                onChange={retrieveUsers}
                recordList={users}
                paginationData={pagination}
                recordFields={{
                    name: "Full Name",
                    email: "Email Address",
                    cnic: "CNIC No.",
                    phone: "Phone Number",
                    rollNo: "Roll No.",
                    role: "Role",
                    status: "Account Status",
                }}
                actions={[
                    { label: "Approve", icon: <FaTrash />, ShowWhen: { status: "approvalPending" }, onClick: handle },
                    { label: "Reject", icon: <FaTimes />, ShowWhen: { status: "approvalPending" }, onClick: handle },
                    { label: "Lock", icon: <FaLock />, ShowWhen: { status: "active" }, onClick: handle },
                    { label: "Unlock", icon: <FaLockOpen />, ShowWhen: { status: "inactive" }, onClick: handle },
                ]}
                searchableFields={{
                    name: "Name",
                    email: "Email",
                    phone: "Phone",
                    nic: "CNIC No.",
                    rollNo: "Roll No.",
                    role: "Role",
                    status: "Account Status",
                }}
                sortableFields={{
                    createdAt: "Date",
                    name: "Name",
                    email: "Email",
                    cnic: "CNIC No.",
                    phone: "Phone Number",
                    status: "Account Status",
                }}
            />
        </DashboardContent>
    );
};

export default ManageAccounts;
