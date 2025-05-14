import { Button, DashboardContent, Form, Input, ProfileForm, UpdatePasswordForm } from "@components"
import { updateProfile, updateAuthenticatedUser } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileImageschema } from "@schemas";
import { readFile } from "@services";
import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [src, setSrc] = useState(null);

    useEffect(() => {
        if (!src && user?.image) (async () => setSrc(await readFile(user.image)))();
    }, [user, src, isEditing]);

    const handleProfilePictureChange = async (data) => {
        const result = await dispatch(updateProfile(data));
        if (updateProfile.fulfilled.match(result)) {
            dispatch(updateAuthenticatedUser(result.payload.user));
            setIsEditing(false);
        };
    }

    const handleImageSelect = ({ target }) => {
        const file = target.files?.[0];
        if (file) setSrc(URL.createObjectURL(file));
    }

    return (
        <DashboardContent title="Profile" description="Manage your profile settings and changes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-primary border border-primary rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bol">
                            Profile Picture
                        </h2>
                        <div>
                            <img
                                src={src}
                                alt="display picture"
                                onClick={() => setIsEditing(true)}
                                className="relative w-48 h-48 text-4xl mx-auto flex rounded-full items-center justify-center font-semibold object-cover cursor-pointer"
                            />
                        </div>

                        {isEditing && (
                            <Form
                                onSubmit={handleProfilePictureChange}
                                resolver={zodResolver(updateProfileImageschema)}
                                resolverMode="onSubmit"
                                encType="multipart/form-data"
                            >
                                <Input
                                    type="file"
                                    name="image"
                                    accept=".jpg,.jpeg,.png"
                                    className="block w-full bg-primary border border-primary rounded-lg cursor-pointerfocus:outline-none focus:ring-2 focus:ring-primary  mt-4 p-2"
                                    onChange={handleImageSelect}
                                />

                                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                                    <Button type="submit" className="flex-1">
                                        <FaSave /> Save
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="button-secondary flex-1"
                                    >
                                        <FaTimes /> Cancel
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <ProfileForm />
                    <UpdatePasswordForm />
                </div>
            </div>
        </DashboardContent>
    )
}

export default ProfileSettings