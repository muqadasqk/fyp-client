import { DashboardContent, Pagination, RangeSector, SearchBar, Table } from "@components"
import { retrieveUsers } from "@features";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const ManageAccounts = () => {
    const dispatch = useDispatch();
    const [params, setParams] = useState({ query: "", page: 1, limit: 10 });
    const { loading, users, metadata } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(retrieveUsers(params));
    }, [params]);

    const handleChange = ({ target }) => {
        setParams((pre) => ({ ...pre, [target.name]: target.value }));
    }

    return (
        <DashboardContent isLoading={loading} title="Manage Accounts" description="Manage user accounts | Approve/Reject account requests">
            <h1>All Users</h1>
            <div>
                <div>
                    <RangeSector onChange={handleChange} value={params.limit} />
                    <SearchBar placeholder="Search users name, email, nic, roll no, roll, status..." onChange={handleChange} value={params.query} />
                </div>
                <Table
                    isLoading={loading}
                    heads={["name", "email", "nic", "rollNo", "role", "image", "status", "verifiedAt"]}
                    items={users}
                />

                <Pagination paginationData={metadata} setCurrentPage={setParams} />
            </div>
        </DashboardContent>
    )
}

export default ManageAccounts