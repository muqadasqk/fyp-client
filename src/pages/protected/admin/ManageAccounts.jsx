import { DataTable, ViewUserDetails } from "@components";
import { Button, CreateUserForm, DashboardContent } from "@components";
import { retrieveUsers } from "@features";
import { capitalize, splitCamelCase } from "@utils";
import { useMemo, useState } from "react";
import { FaEye, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const ManageAccounts = ({ roleOrStatus }) => {
    const { users, pagination, loading } = useSelector((state) => state.users);
    const [viewDetails, setViewDetails] = useState(null);
    const [role, setRole] = useState(null);
    const retrieve = useMemo(() => ({ role: roleOrStatus }), [roleOrStatus]);

    const handleViewDetails = (id) => {
        setViewDetails(users.find(user => user._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${roleOrStatus == "approvalPending" ? "Pending" : roleOrStatus} Accounts`)} description="Manage your accounts here.">
            {!["approvalPending", "rejected"].includes(roleOrStatus) && (
                <Button type="button" className="mb-5" onClick={() => setRole(roleOrStatus)}>
                    <FaUserPlus /> Create {roleOrStatus} account
                </Button>
            )}

            {role && <CreateUserForm isLoading={loading} role={role} closeForm={() => setRole(null)} />}
            {viewDetails && <ViewUserDetails user={viewDetails} closeForm={() => setViewDetails(null)} />}

            <DataTable
                onChange={retrieveUsers}
                recordList={users}
                retrieve={retrieve}
                paginationData={pagination}
                empty={`No ${splitCamelCase(roleOrStatus).toLowerCase()} accounts found.`}
                recordFields={{
                    name: "Full Name",
                    email: "Email Address",
                    ...(roleOrStatus == "student" ? { rollNo: "Roll No." } : {}),
                    cnic: "CNIC No.",
                    ...(!["admin", "supervisor", "student"].includes(roleOrStatus) ? { role: "Role" } : {})
                }}
                actions={[{
                    label: "View",
                    icon: <FaEye />,
                    ShowWhen: { status: true },
                    onClick: handleViewDetails
                }]}
                searchableFields={{
                    name: "Name",
                    email: "Email",
                    ...(roleOrStatus == "student" ? { rollNo: "Roll No." } : {}),
                    cnic: "CNIC No.",
                    ...(!["admin", "supervisor", "student"].includes(roleOrStatus) ? { role: "Role" } : {})
                }}
            />
        </DashboardContent>
    );
};

export default ManageAccounts;
