import { Button, CreateProposalForm, DashboardContent, DataTable, ViewProposalDetails } from '@components'
import { retrieveManyProposal } from '@features'
import { useState } from 'react'
import { FaLightbulb } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Proposals = () => {
    const { proposals, pagination, loading } = useSelector((state) => state.proposals);
    const { user } = useSelector((state) => state.auth);
    const [viewDetails, setViewDetails] = useState(null);

    const [pitchIdea, setPitchIdea] = useState(false);

    return (
        <DashboardContent title='Proposals' description='View and manage your proposals'>
            <Button type="button" className="mb-5" onClick={() => setPitchIdea(!pitchIdea)}>
                <FaLightbulb /> Pitch an idea
            </Button>
            {pitchIdea && <CreateProposalForm isLoading={loading} closeForm={(v) => setPitchIdea(v && false)} />}
            {viewDetails && <ViewProposalDetails proposal={proposals.find(proposal => proposal._id == viewDetails)} closeForm={(v) => setViewDetails(v && false)} />}

            <DataTable
                onChange={retrieveManyProposal}
                concernId={user._id}
                recordList={proposals}
                paginationData={pagination}
                recordFields={{
                    // "lead.name": "Lead",
                    // "memberOne.name": "Member One",
                    // "memberTwo.name": "Member Two",
                    // "supervisor.name": "Supervior",
                    title: "Title",
                    // abstract: "Abstracts",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
                actions={[
                    { label: "View Details", icon: <FaLightbulb />, ShowWhen: { status: true }, onClick: (id) => setViewDetails(id) },
                ]}
                searchableFields={{
                    title: "Title",
                    // abstract: "Abstracts",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
            // sortableFields={{
            //     createdAt: "Date",
            //     title: "Title",
            //     // abstract: "Abstracts",
            //     type: "Type",
            //     category: "Category",
            //     status: "Status",
            // }}
            />
        </DashboardContent >
    )
}

export default Proposals