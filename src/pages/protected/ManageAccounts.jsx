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
        <DashboardContent title="Manage Supervisor and Student Accounts" description="Manage Supervisor and Student Accounts | Approve/Reject account requests">
            <div>
                <div>
                    <Button type="button" onClick={() => setSelectRoleForm(true)}>
                        <FaPlus /> Add a Supervisor/Student
                    </Button>

                    {selectRoleForm && <ul>
                        <li onClick={() => handleRoleForm("supervisor")}>A Supervisor</li>
                        <li onClick={() => handleRoleForm("student")}>A Student</li>
                    </ul>}

                    {role && <CreateUserForm isLoading={loading} role={role} closeForm={(v) => setRole(v && null)} />}
                </div>

                <div>
                    <RangeSelector
                        value={page.size}
                        onChange={({ target }) => setPage((p) => ({ ...p, size: target.value }))}
                    />
                    <SearchBar
                        fields={{
                            name: "Name",
                            email: "Email",
                            phone: "Phone",
                            nic: "CNIC No.",
                            rollNo: "Roll No.",
                            role: "Role",
                            status: "Account Status"
                        }}
                        set={(query) => setPage((p) => ({ ...p, query }))}
                    />
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
                isLoading={loading}
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
                    { label: "Approve", icon: <FaTrash />, ShowWhen: { status: "approvalPending" }, fn: handle },
                    { label: "Reject", icon: <FaCross />, ShowWhen: { status: "approvalPending" }, fn: handle },
                    { label: "Lock", icon: <FaLock />, ShowWhen: { status: "active" }, fn: handle },
                    { label: "Unlock", icon: <FaLockOpen />, ShowWhen: { status: "inactive" }, fn: handle },
                ]}
            />

            <div>
                <Pagination data={pagination} set={(current) => setPage((p) => ({ ...p, current }))} />
            </div>
        </DashboardContent>
    );
};

export default ManageAccounts;