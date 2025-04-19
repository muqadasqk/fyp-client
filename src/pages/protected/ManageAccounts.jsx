import { Spinner } from "@components";
import { Button, CreateUserForm, DashboardContent, Pagination, RangeSelector, SearchBar, Sort, Table } from "@components";
import { retrieveUsers, updateStatus } from "@features";
import { useEffect, useState } from "react";
import { FaCross, FaLock, FaLockOpen, FaPlus, FaPlusSquare, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ManageAccounts = () => {
    const dispatch = useDispatch();
    const { users, pagination, loading } = useSelector((state) => state.users);
    const [selectRoleForm, setSelectRoleForm] = useState(false);
    const [role, setRole] = useState(null);
    const [page, setPage] = useState({ current: 1, size: 10, query: {}, sort: { createdAt: -1 } });

    useEffect(() => {
        dispatch(retrieveUsers(page));
    }, [page, dispatch]);

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
        setRole(role); setSelectRoleForm(false);
    }

    return (
        <DashboardContent isLoading={loading} title="Manage Supervisor and Student Accounts" description="Manage Supervisor and Student Accounts | Approve/Reject account requests">
            <div className="flex   relative flex-col lg-flex-row justify-between items-start gap-4 mb-6 w-full ">
                <div className="relative">
                    <Button type="button" onClick={() => setSelectRoleForm(true)}>
                        <FaPlus className="mx-2" /> Add a Supervisor/Student
                    </Button>

                    {selectRoleForm && (
                        <div className="absolute w-full bg-white shadow-md rounded z-0">
                            <div onClick={() => handleRoleForm("supervisor")} className="cursor-pointer p-2 rounded transition hover:bg-black/10"> A Supervisor</div>
                            <div onClick={() => handleRoleForm("student")} className="cursor-pointer p-2 rounded transition hover:bg-black/10">A Student</div>
                        </div>)
                    }

                    {role && <CreateUserForm isLoading={loading} role={role} closeForm={(v) => setRole(v && null)} />}
    
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center mb-3 rounded-md">
                <div className="flex-shrink-0">
                    <RangeSelector
                        value={page.size}
                        onChange={({ target }) => setPage((p) => ({ ...p, size: target.value }))}
                    />
                </div>

                <div className="flex-grow">
                    <SearchBar
                        fields={{
                            name: "Name",
                            email: "Email",
                            phone: "Phone",
                            nic: "CNIC No.",
                            rollNo: "Roll No.",
                            role: "Role",
                            status: "Account Status",
                        }}
                        set={(query) => setPage((p) => ({ ...p, query }))}
                    />
                </div>

                <div className="flex-shrink-0">
                    <Sort
                        fields={{
                            createdAt: "Date",
                            name: "Name",
                            email: "Email",
                            cnic: "CNIC No.",
                            phone: "Phone Number",
                            status: "Account Status",
                        }}
                        set={(sort) => setPage((p) => ({ ...p, sort }))}
                    />
                </div>


            </div>

            <Table
                // isLoading={loading}
                records={users}
                fields={{
                    name: "Full Name",
                    email: "Email Address",
                    cnic: "CNIC No.",
                    phone: "Phone Number",
                    rollNo: "Roll No.",
                    role: "Role",
                    status: "Account Status"
                }}
                actions={[
                    {
                        label: "Approve",
                        icon: <FaTrash />,
                        ShowWhen: { status: "approvalPending" },
                        onClick: handle
                    },
                    { label: "Reject", icon: <FaCross />, ShowWhen: { status: "approvalPending" }, onClick: handle },
                    { label: "Lock", icon: <FaLock/>, ShowWhen: { status: "active" }, onClick: handle },
                    { label: "Unlock", icon: <FaLockOpen />, ShowWhen: { status: "inactive" }, onClick: handle },
                ]}
            />

            <div>
                <Pagination data={pagination} set={(current) => setPage((p) => ({ ...p, current }))} />
            </div>
        </DashboardContent>
    );
};

export default ManageAccounts;