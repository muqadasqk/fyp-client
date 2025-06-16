import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiUpload, HiLockClosed } from 'react-icons/hi';
import { Button, DashboardContent, DataTable, Form, Input } from '@components';
import { retrieveSingleProject, projectSpecificPresentations, uploadProjectFile, projectSpecificMeetings } from '@features';
import { readFile } from '@services';
import { capEach, firstLetter, formatFilePath, splitCamelCase } from '@utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadProposalFileSchema } from '@schemas';
import clsx from 'clsx';

const MyProject = () => {
    const dispatch = useDispatch();
    const { project, loading } = useSelector((state) => state.projects);
    const { presentations, pagination: presentationsPagination } = useSelector((state) => state.presentations);
    const { meetings, pagination: meetigsPagination } = useSelector((state) => state.meetings);
    const { user } = useSelector((state) => state.auth);
    const [images, setImages] = useState({ lead: null, memberOne: null, memberTwo: null, supervisor: null });
    const [readMore, setReadMore] = useState(false);
    const [length, setLength] = useState(225);
    const [activeTab, setActiveTab] = useState('Presentations');
    const projectId = useMemo(() => ({ projectId: project._id }), [project]);

    const handleUploadFile = async (data) => {
        await dispatch(uploadProjectFile({ projectId: project._id, formData: data }));
    }

    useEffect(() => {
        if (user._id) dispatch(retrieveSingleProject(user._id));
    }, [user, dispatch]);

    useEffect(() => {
        (async () => {
            const [lead, memberOne, memberTwo, supervisor] = await Promise.all([
                project?.lead?.image ? readFile(project.lead.image).catch(() => null) : null,
                project?.memberOne?.image ? readFile(project.memberOne.image).catch(() => null) : null,
                project?.memberTwo?.image ? readFile(project.memberTwo.image).catch(() => null) : null,
                project?.supervisor?.image ? readFile(project.supervisor.image).catch(() => null) : null,
            ]);
            setImages({ lead, memberOne, memberTwo, supervisor });
        })();

        if (project?.abstract) {
            const memebrs = [!!project.lead, !!project.memberOne, !!project.memberTwo, !!project.supervisor].filter(Boolean).length;
            if (memebrs == 4) {
                setLength(700);
            }
        };

    }, [project]);
    console.log("length", length)

    const PersonCard = (user, label, imageKey, hasRoleNo = true) => (
        <div className="bg-primary border border-primary rounded-lg p-4 flex gap-4 items-center w-full">
            {images[imageKey] ? (
                <img
                    src={images[imageKey]}
                    alt={user?.name}
                    className="w-16 h-16 object-cover rounded-full border border-primary"
                />
            ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-secondary border border-primary text-lg font-semibold text-secondary">
                    {firstLetter(user?.name)}
                </div>
            )}
            <div>
                <h3 className="text-lg font-semibold text-primary m-0">{label}</h3>
                <p className="text-sm text-secondary font-medium">
                    Name: <span className="text-primary">{capEach(user?.name)} {hasRoleNo && (<span className="font-extralight">({user?.rollNo})</span>)}</span>
                </p>
                <p className="text-sm text-secondary">Email: <span className="text-primary">{user?.email}</span></p>
            </div>
        </div>
    );

    return (
        <DashboardContent title="My Project" description="View and manage your project">
            <div className="flex flex-col gap-6">

                <div className="grid lg:grid-cols-5 gap-2 items-stretch">
                    <div className="col-span-2 space-y-2">
                        {PersonCard(project.lead, 'Project Lead', 'lead')}
                        {project?.memberOne && PersonCard(project.memberOne, 'Member One', 'memberOne')}
                        {project?.memberTwo && PersonCard(project.memberTwo, 'Member Two', 'memberTwo')}
                        {PersonCard(project.supervisor, 'Supervisor', 'supervisor', false)}
                    </div>

                    <div className="col-span-3">
                        <div className="relative bg-primary border border-primary p-6 rounded-lg h-full flex flex-col justify-between">

                            {project.status === 'initialized' ? (
                                <div className="absolute inset-0 bg-primary/70 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl text-center p-4">
                                    <HiLockClosed className="text-4xl text-secondary mb-2" />
                                    <h3 className="text-xl font-bold text-secondary">Project Locked</h3>
                                    <p className="text-sm text-secondary mb-4">Please upload your proposal file to unlock project details.</p>

                                    <Form className="mx-10" onSubmit={handleUploadFile} encType="multipart/form-data" resolver={zodResolver(uploadProposalFileSchema)}>
                                        <Input
                                            type="file"
                                            name="proposal"
                                            accept=".pdf,.doc,.docx"
                                            className="input-primary w-full"
                                        />
                                        <Button type="submit" className="w-full" isLoading={loading}>
                                            <HiUpload className="text-lg" /> Upload
                                        </Button>
                                    </Form>
                                </div>
                            ) : null}

                            {project.status !== 'initialized' && (
                                <div>
                                    <h2 className="text-2xl font-bold text-center text-theme mb-1">{capEach(project.title)}</h2>
                                    <p className="text-sm text-secondary mb-4 text-center font-bold">PID: {project?.pid}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mt-10 mb-4 text-sm text-secondary">
                                        <span>Status: <span className="text-primary">{splitCamelCase(project.status)}</span></span>
                                        <span>Category: <span className="text-primary">{capEach(project.category)}</span></span>
                                        <span>Type: <span className="text-primary">{splitCamelCase(project.type)}</span></span>
                                        <span>Proposal File: <Button href={formatFilePath(project?.proposal)} target="_blank" rel="noopener noreferrer" className="text-sm">View Proposal File</Button></span>
                                    </div>

                                    {project.abstract && (
                                        <div className="mb-2">
                                            <h4 className="text-lg font-semibold text-primary mb-1">Abstract</h4>
                                            <p className="text-sm text-secondary whitespace-pre-line">
                                                {readMore
                                                    ? <>
                                                        {project.abstract}
                                                        <Button href="#" className="!text-sm" onClick={() => setReadMore(!readMore)}>
                                                            Hide
                                                        </Button>
                                                    </>
                                                    : <>
                                                        {project.abstract.slice(0, length)}...
                                                        <Button href="#" className="!text-sm" onClick={() => setReadMore(!readMore)}>
                                                            Read full
                                                        </Button>
                                                    </>
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {!!project._id && project.status !== 'initialized' && (
                    <div className="bg-primary border border-primary rounded-lg w-full overflow-hidden">
                        <div className="flex w-full">
                            {['Presentations', 'Meetings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={clsx(
                                        "w-1/2 py-2 text-sm font-semibold transition-all duration-200",
                                        activeTab === tab ? "bg-theme" : "bg-primary hover:bg-primary-hover",
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'Presentations' && (
                            <div className="p-4 w-full">
                                <h4 className="font-semibold text-primary">Project Presentations</h4>
                                <DataTable
                                    contentOnly
                                    onChange={projectSpecificPresentations}
                                    retrieve={projectId}
                                    recordList={presentations}
                                    paginationData={presentationsPagination}
                                    recordFields={{
                                        summary: 'Summary',
                                        remarks: 'Remarks',
                                        fyp: 'Phase',
                                        status: 'Status',
                                    }}
                                />
                            </div>
                        )}

                        {activeTab === 'Meetings' && (
                            <div className="p-4 w-full">
                                <h4 className="font-semibold text-primary">Project Meetings</h4>
                                <DataTable
                                    contentOnly
                                    onChange={projectSpecificMeetings}
                                    retrieve={projectId}
                                    recordList={meetings}
                                    paginationData={meetigsPagination}
                                    recordFields={{
                                        link: "Meeting Link",
                                        summary: "Summary",
                                        reference: "Reference Material",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardContent >
    );
};

export default MyProject;
