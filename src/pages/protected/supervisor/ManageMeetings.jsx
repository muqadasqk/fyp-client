import { Button, DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrieveMeetings } from '@features'
import { capitalize, splitCamelCase } from '@utils';
import { useMemo, useState } from 'react';
import { FaClock, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const ManageMeetings = ({ status }) => {
    const { meetings, pagination } = useSelector((state) => state.meetings);
    const [viewDetails, setViewDetails] = useState(null);
    const retrieve = useMemo(() => ({ status }), [status]);

    const handleViewDetails = (id) => {
        setViewDetails(meetings.find(meeting => meeting._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${splitCamelCase(status)} Presentations`)} description='View and manage presenations'>
            <Button type="button" className="mb-5">
                <FaClock /> Schedule a meeting
            </Button>

            {viewDetails && (
                <ViewProposalDetails meeting={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={retrieveMeetings}
                retrieve={retrieve}
                recordList={meetings}
                paginationData={pagination}
                empty="No meetings found"
                recordFields={{
                    "project.title": "Project",
                    link: "Meeting Link",
                    summary: "Summary",
                    reference: "Reference Material",
                }}
                actions={[
                    // { label: "Files", icon: <FaFileArchive />, ShowWhen: { resource: true }, onClick: handleViewDetails },
                    { label: "Details", icon: <FaEye />, ShowWhen: { status: true }, onClick: handleViewDetails },
                ]}
                searchableFields={{
                    summary: "Summary",
                }}
            />
        </DashboardContent >
    )
}

export default ManageMeetings