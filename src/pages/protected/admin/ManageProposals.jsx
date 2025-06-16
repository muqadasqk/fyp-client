import { DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrieveProposals } from '@features'
import { capitalize } from '@utils';
import { useMemo, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const ManageProposals = ({ status }) => {
    const { proposals, pagination } = useSelector((state) => state.proposals);
    const [viewDetails, setViewDetails] = useState(null);
    const retrieve = useMemo(() => ({ status }), [status]);

    const handleViewDetails = (id) => {
        setViewDetails(proposals.find(proposal => proposal._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${status === "conditionallyAccepted" ? "Conditionally Accepted" : status} Proposals`)} description='View and manage proposal ideas'>
            {viewDetails && (
                <ViewProposalDetails proposal={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={retrieveProposals}
                retrieve={retrieve}
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
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
            />
        </DashboardContent >
    )
}

export default ManageProposals