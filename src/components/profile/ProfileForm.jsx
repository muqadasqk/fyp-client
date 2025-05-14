import { Button, Form, Input } from "@components";
import { updateAuthenticatedUser, updateProfile } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@schemas";
import { readLocalStorage } from "@utils";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ProfileForm = () => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const profile = readLocalStorage("authenticatedUser", true);

    const onSubmit = async (data) => {
        data = Object.fromEntries(data.entries());
        if (Object.keys(data).some(key => data[key] !== profile[key])) {
            const result = await dispatch(updateProfile(data));
            if (updateProfile.fulfilled.match(result)) {
                dispatch(updateAuthenticatedUser(result.payload.user));
                setIsEditing(false);
            } return;
        }
        setIsEditing(false);
    }

    const renderViewMode = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="font-medium">Full Name</label>
                    <p className="text-lg font-semibold break-words">{profile?.name}</p>
                </div>
                <div>
                    <label className="font-medium">Email Address</label>
                    <p className="text-lg font-semibold break-words">{profile?.email}</p>
                </div>
                {profile?.cnic && <div>
                    <label className="font-medium">CNIC No.</label>
                    <p className="text-lg font-semibold break-words">{profile?.cnic ?? "Not Provided"}</p>
                </div>}
                <div>
                    <label className="font-medium">Phone Number</label>
                    <p className="text-lg font-semibold break-words">{profile?.phone ?? "Not provided"}</p>
                </div>
                {profile?.rollNo && <div>
                    <label className="font-medium">Roll No.</label>
                    <p className="text-lg font-semibold break-words">{profile.rollNo}</p>
                </div>}
            </div>

            <Button type="button" onClick={() => setIsEditing(true)} className="w-full">
                <FaEdit /> Edit Profile
            </Button>
        </div>
    );

    const renderEditMode = () => (
        <Form onSubmit={onSubmit} resolver={zodResolver(updateProfileSchema)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input
                    name="name"
                    label="Full Name"
                    placeholder="Your full name"
                    defaultValue={profile?.name ?? undefined}
                />
                <Input
                    name="email"
                    label="Email Address"
                    placeholder="Your email address"
                    defaultValue={profile?.email ?? undefined}
                />

                {profile?.cnic && <Input
                    name="cnic"
                    label="CNIC No."
                    defaultValue={profile?.cnic ?? undefined}
                    placeholder="Your cnic no."
                    disabled={true}
                />}
                <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="Your phone number"
                    defaultValue={profile?.phone ?? undefined}
                />

                {profile?.rollNo && <Input
                    name="rollNo"
                    label="Roll No."
                    defaultValue={profile.rollNo ?? undefined}
                    placeholder="Your roll no."
                    disabled={true}
                />}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1">
                    <FaSave /> Save Changes
                </Button>

                <Button type="button" onClick={() => setIsEditing(false)} className="button-secondary flex-1">
                    <FaTimes /> Cancel
                </Button>
            </div>
        </Form>
    );

    return (
        <div className="bg-primary sm:border sm:border-primary sm:rounded-lg p-6 w-full">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            {isEditing ? renderEditMode() : renderViewMode()}
        </div>
    );
};

export default ProfileForm;
