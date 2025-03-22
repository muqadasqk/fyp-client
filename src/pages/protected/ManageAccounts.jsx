import { DashboardContent, Pagination, Table } from "@components"
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
        <DashboardContent isLaoding={loading} title="Manage Accounts" description="Manage user accounts | Approve/Reject account requests">
            <h1>All Users</h1>
            <div>
                <div>
                    <select name="limit" onChange={handleChange}>
                        {[1, 5, 10, 20, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
                    </select>

                    <input type="search" name="query" onChange={handleChange} />
                </div>

                <Table
                    heads={["name", "email", "nic", "rollNo", "role", "image", "status", "verifiedAt"]}
                    items={users}
                    pagination={metadata}
                />

                <Pagination paginationData={metadata} setCurrentPage={setParams} />
            </div>
        </DashboardContent>
    )
}

export default ManageAccounts