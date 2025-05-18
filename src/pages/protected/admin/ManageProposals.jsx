import { DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrieveProposals } from '@features'
import { capitalize } from '@utils';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const ManageProposals = ({ status }) => {
    const { proposals, pagination } = useSelector((state) => state.proposals);
    const [viewDetails, setViewDetails] = useState(null);

    const handleViewDetails = (id) => {
        setViewDetails(proposals.find(proposal => proposal._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${status === "conditionallyAccepted" ? "Conditionally Accepted" : status} proposals`)} description='View and manage proposal ideas'>
            {viewDetails && (
                <ViewProposalDetails proposal={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={retrieveProposals}
                concernId={status}
                recordList={proposals}
                paginationData={pagination}
                recordFields={{
                    title: "Title",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
                actions={[
                    { label: "view details", icon: <FaInfoCircle />, ShowWhen: { status: true }, onClick: handleViewDetails },
                ]}
                searchableFields={{
                    title: "Title",
                    abstract: "Abstracts",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
                sortableFields={{
                    createdAt: "Date",
                    title: "Title",
                    abstract: "Abstracts",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
            />
        </DashboardContent >
    )
}

export default ManageProposals