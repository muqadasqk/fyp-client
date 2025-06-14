import { Button, DashboardContent, DataTable } from '@components';
import { projectSpecificPresentations, retrieveSingleProject } from '@features';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiLockClosed, HiUpload } from 'react-icons/hi';
import { firstLetter } from '@utils';
import { readFile } from '@services';

const MyProject = () => {
    const dispatch = useDispatch();
    const { project, loading } = useSelector((state) => state.projects);
    const { presentations, pagination } = useSelector((state) => state.presentations);
    const { user } = useSelector((state) => state.auth);
    const [images, setImages] = useState({
        lead: null,
        memberOne: null,
        memberTwo: null,
        supervisor: null,
    });
    const projectId = useMemo(() => ({ projectId: project._id }), [project]);

    useEffect(() => {
        !!user._id && dispatch(retrieveSingleProject(user._id));
    }, [user._id]);

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
    }, [project]);

    const PersonCard = (user, label, imageKey, showRoll = true) => (
        <div className="bg-primary border border-primary rounded-xl p-4 flex gap-4 items-center w-full">
            {images[imageKey] ? (
                <img
                    src={images[imageKey]}
                    alt={user?.name}
                    className="w-16 h-16 object-cover rounded-full border border-primary"
                />
            ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-secondary border border-primary text-lg font-semibold text-primary">
                    {firstLetter(user?.name)}
                </div>
            )}
            <div>
                <h3 className="text-lg font-semibold text-primary">{label}</h3>
                <p className="text-sm text-secondary font-medium">{user?.name}</p>
                {showRoll && <p className="text-sm text-secondary">{user?.rollNo}</p>}
                <p className="text-sm text-secondary">{user?.email}</p>
            </div>
        </div>
    );

    return (
        <DashboardContent title="My Project" description="View and manage your project">
            {/* Title and PID */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
                <p className="text-sm text-secondary font-medium">Project ID: {project.pid}</p>
            </div>

            {/* Person Cards - Desktop Layout */}
            <div className="hidden lg:grid grid-cols-5 gap-4 mb-6">
                <div className="space-y-4 col-span-2">
                    {PersonCard(project.lead, 'Project Lead', 'lead')}
                    {project?.memberOne && PersonCard(project.memberOne, 'Member One', 'memberOne')}
                </div>
                <div className="space-y-4 col-span-1"></div>
                <div className="space-y-4 col-span-2">
                    {PersonCard(project.supervisor, 'Supervisor', 'supervisor', false)}
                    {project?.memberTwo && PersonCard(project.memberTwo, 'Member Two', 'memberTwo')}
                </div>
            </div>

            {/* Person Cards - Mobile Layout */}
            <div className="lg:hidden space-y-4 mb-6">
                {PersonCard(project.lead, 'Project Lead', 'lead')}
                {project?.memberOne && PersonCard(project.memberOne, 'Member One', 'memberOne')}
                {project?.memberTwo && PersonCard(project.memberTwo, 'Member Two', 'memberTwo')}
                {PersonCard(project.supervisor, 'Supervisor', 'supervisor', false)}
            </div>

            {/* Project Detail Card */}
            <div className="relative bg-primary border border-primary p-6 rounded-2xl w-full mb-6">
                {/* Blurred Overlay */}
                {project.status === 'initialized' && (
                    <div className="absolute inset-0 bg-white/70 dark:bg-black/30 backdrop-blur-md flex flex-col items-center justify-center z-10 rounded-2xl">
                        <HiLockClosed className="text-4xl text-primary mb-2" />
                        <p className="text-primary font-semibold">Project Locked</p>
                        <p className="text-sm text-secondary">Please upload your proposal file to unlock.</p>
                    </div>
                )}

                {/* Status Row */}
                <div className="flex flex-wrap gap-4 justify-center mb-4">
                    <span className="text-sm text-secondary">
                        <strong className="text-primary">Status:</strong>{' '}
                        <span className="capitalize text-theme font-semibold">{project.status}</span>
                    </span>
                    <span className="text-sm text-secondary">
                        <strong className="text-primary">Category:</strong> {project.category}
                    </span>
                    <span className="text-sm text-secondary">
                        <strong className="text-primary">Type:</strong> {project.type}
                    </span>
                    {project.proposal && (
                        <a
                            href={project.proposal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-theme underline"
                        >
                            View Proposal File
                        </a>
                    )}
                </div>

                {/* Abstract */}
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-1">Abstract</h4>
                    <p className="text-sm text-secondary whitespace-pre-line">{project.abstract}</p>
                </div>

                {/* Upload Form */}
                {project.status === 'initialized' && (
                    <div className="mt-4">
                        <form className="space-y-2 max-w-md mx-auto">
                            <input type="file" accept=".pdf,.doc,.docx" className="input-primary w-full" />
                            <Button type="submit" className="button-primary w-full flex items-center justify-center gap-2">
                                <HiUpload className="text-lg" /> Upload Proposal
                            </Button>
                        </form>
                    </div>
                )}
            </div>

            {/* Presentations Table */}
            {!!project._id && (
                <div className="bg-primary border border-primary rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-2">Project Presentations</h4>
                    <DataTable
                        onChange={projectSpecificPresentations}
                        retrieve={projectId}
                        recordList={presentations}
                        paginationData={pagination}
                        recordFields={{
                            summary: 'Summary',
                            fyp: 'Phase',
                            resource: 'Resource',
                            remarks: 'Remarks',
                            status: 'Status',
                        }}
                        searchableFields={{
                            summary: 'Summary',
                            fyp: 'Phase',
                            resource: 'Resource',
                            remarks: 'Remarks',
                            status: 'Status',
                        }}
                    />
                </div>
            )}
        </DashboardContent>
    );
};

export default MyProject;
