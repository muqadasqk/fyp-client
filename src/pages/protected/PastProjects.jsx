import { DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrieveProposals } from '@features'
import { useMemo, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const PastProjects = ({ status = "past" }) => {
    const { proposals, pagination } = useSelector((state) => state.proposals);
    const { user } = useSelector((state) => state.auth);
    const [viewDetails, setViewDetails] = useState(null);
    const retrieve = useMemo(() => ({ status }), []);

    const handleViewDetails = (id) => {
        setViewDetails(proposals.find(proposal => proposal._id == id));
    }

    return (
        <DashboardContent title={status == "supervised" ? "Previously Supervised Projects" : "Previous Projects"} description={"All previous projects from years"}>
            <div className="flex justify-between items-center gap-5 p-2 mb-2">
                <h4 className="font-black text-theme mb-0">
                    {status == "supervised" ? "Previously Supervised Projects" : "Previous Projects"}
                </h4>
            </div>

            {viewDetails && (
                <ViewProposalDetails isPastProject proposal={viewDetails} closeForm={() => setViewDetails(null)} />
            )}

            <DataTable
                onChange={retrieveProposals}
                retrieve={retrieve}
                recordList={proposals}
                paginationData={pagination}
                recordFields={{
                    ...(status == "supervised" ? { "lead.name": "Team Lead" } : { "supervisor.name": "Supervisor" }),
                    title: "Title",
                    department: "department",
                    batch: "batch",
                    category: "Category",
                    type: "Type",
                }}
                actions={[
                    { label: "Details", icon: <FaEye />, ShowWhen: { status: true }, onClick: handleViewDetails },
                ]}
                searchableFields={{
                    title: "Title",
                    department: "department",
                    batch: "batch",
                    category: "Category",
                    type: "Type",
                    absract: "Abstract",
                }}
                empty={status == "supervised" ? "No previously your supervised projects to show" : "No previous projects found"}
            />
        </DashboardContent >
    )
}

export default PastProjects