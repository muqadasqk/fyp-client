import { DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrievePresentations } from '@features'
import { capitalize, splitCamelCase } from '@utils';
import { useMemo, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const ManagePresentations = ({ status }) => {
    const { presentations, pagination } = useSelector((state) => state.presentations);
    const [viewDetails, setViewDetails] = useState(null);
    const retrieve = useMemo(() => ({ status }), [status]);

    const handleViewDetails = (id) => {
        setViewDetails(presentations.find(proposal => proposal._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${splitCamelCase(status)} Presentations`)} description='View and manage presenations'>
            {viewDetails && (
                <ViewProposalDetails proposal={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={retrievePresentations}
                retrieve={retrieve}
                recordList={presentations}
                paginationData={pagination}
                empty="No presentations found"
                recordFields={{
                    "project.title": "Project",
                    summary: "Summary",
                    remarks: "Remarks",
                    fyp: "Phase",
                    ...(status == "all" ? { status: "Status" } : {})
                }}
                actions={[
                    // { label: "Files", icon: <FaFileArchive />, ShowWhen: { resource: true }, onClick: handleViewDetails },
                    { label: "Details", icon: <FaEye />, ShowWhen: { status: true }, onClick: handleViewDetails },
                ]}
                searchableFields={{
                    summary: "Summary",
                    remarks: "Remarks",
                    fyp: "Phase",
                    ...(status == "all" ? { status: "Status" } : {})
                }}
            />
        </DashboardContent >
    )
}

export default ManagePresentations