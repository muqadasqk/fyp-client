import { Button, CreateProposalForm, DashboardContent, Listing } from '@components'
import { retrieveManyProposal, retrieveProposals } from '@features'
import { useState } from 'react'
import { FaLightbulb } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Proposals = () => {
    const { proposals, pagination, loading } = useSelector((state) => state.proposals);
    const { user } = useSelector((state) => state.auth);
    const [pitchIdea, setPitchIdea] = useState(false);

    console.log(proposals, pagination, loading);

    return (
        <DashboardContent title='Proposals' description='View and manage your proposals'>
            <Button type="button" className="mb-5" onClick={() => setPitchIdea(!pitchIdea)}>
                <FaLightbulb /> Pitch an idea
            </Button>
            {pitchIdea && <CreateProposalForm isLoading={loading} closeForm={(v) => setPitchIdea(v && false)} />}

            <Listing
                onChange={retrieveManyProposal}
                concernId={user._id}
                recordList={proposals}
                paginationData={pagination}
                recordFields={{
                    "lead.name": "Lead",
                    "memberOne.name": "Member One",
                    "memberTwo.name": "Member Two",
                    "supervisor.name": "Supervior",
                    title: "Title",
                    // abstract: "Abstracts",
                    type: "Type",
                    category: "Category",
                    status: "Status",
                }}
                // actions={}
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

export default Proposals