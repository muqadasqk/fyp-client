import { DashboardContent, DataTable, ViewProjectDetails } from '@components'
import { retrieveProjects, retrieveSupervisorProjects } from '@features'
import { capitalize } from '@utils';
import { useMemo, useState } from 'react';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const ManageProjects = ({ status }) => {
    const { projects, pagination } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);
    const [viewDetails, setViewDetails] = useState(null);
    const retrieve = useMemo(() => {
        if (user.role == "supervisor") {
            return { status, supervisorId: user._id };
        }

        return { status };
    }, [status, user]);

    const handleViewDetails = (id) => {
        setViewDetails(projects.find(project => project._id == id));
    }

    return (
        <DashboardContent title={capitalize(`${status === "underDevelopment" ? "Under Develpment" : status} Projects`)} description='View and manage projects'>
            {viewDetails && (
                <ViewProjectDetails project={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={user.role == "supervisor" ? retrieveSupervisorProjects : retrieveProjects}
                retrieve={retrieve}
                recordList={projects}
                paginationData={pagination}
                recordFields={{
                    title: "Title",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
                actions={[
                    { label: "Details", icon: <FaEye />, ShowWhen: { status: true }, onClick: handleViewDetails },
                ]}
                searchableFields={{
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

export default ManageProjects