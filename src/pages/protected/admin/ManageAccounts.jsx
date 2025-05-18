import { DataTable, ViewUserDetails } from "@components";
import { Button, CreateUserForm, DashboardContent } from "@components";
import { retrieveUsers } from "@features";
import { capitalize } from "@utils";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ManageAccounts = ({ roleOrStatus }) => {
    const dispatch = useDispatch();
    const { users, pagination, loading } = useSelector((state) => state.users);
    const [viewDetails, setViewDetails] = useState(null);
    const [role, setRole] = useState(null);

    const handleViewDetails = (id) => {
        setViewDetails(users.find(user => user._id == id));
    }

    return (
        <DashboardContent isLoading={loading} title={capitalize(`${roleOrStatus == "approvalPending" ? "Pending" : roleOrStatus} accounts`)} description="Manage Supervisor and Student Accounts | Approve/Reject account requests">
            {!["approvalPending", "rejected"].includes(roleOrStatus) && (
                <Button type="button" className="mb-5" onClick={() => setRole(roleOrStatus)}>
                    Create new {roleOrStatus}
                </Button>
            )}
            {role && <CreateUserForm isLoading={loading} role={role} closeForm={() => setRole(null)} />}
            {viewDetails && <ViewUserDetails user={viewDetails} closeForm={() => setViewDetails(null)} />}

            <DataTable
                onChange={retrieveUsers}
                recordList={users}
                concernId={roleOrStatus}
                paginationData={pagination}
                recordFields={{
                    name: "Full Name",
                    email: "Email Address",
                    role: "Role",
                }}
                actions={[
                    { label: "View Details", icon: <FaInfoCircle />, ShowWhen: { status: true }, onClick: handleViewDetails }
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
            />
        </DashboardContent>
    );
};

export default ManageAccounts;
