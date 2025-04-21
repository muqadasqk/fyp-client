import { Button, DashboardContent, Form, Input, ProfileForm, UpdatePasswordForm } from "@components"
import { updateProfile } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileImageschema } from "@schemas";
import { readFile } from "@services";
import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";
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
        if (updateProfile.fulfilled.match(result)) setIsEditing(false);
    }

    const handleImageSelect = ({ target }) => {
        const file = target.files?.[0];
        if (file) setSrc(URL.createObjectURL(file));
    }

    return (
        <DashboardContent title="Profile" description="Manage your profile settings and changes">
            <div className="max-w-7xl p-4 mx-auto sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6 hidden lg:block">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Profile Picture
                            </h2>
                            <div>
                                <img
                                    src={src}
                                    alt="display picture"
                                    onClick={() => setIsEditing(true)}
                                    className="relative w-48 h-48 text-4xl mx-auto flex rounded-full items-center justify-center text-white font-semibold object-cover cursor-pointer"
                                />
                            </div>

                            {isEditing && (
                                <Form
                                    onSubmit={handleProfilePictureChange}
                                    resolver={zodResolver(updateProfileImageschema)}
                                    encType="multipart/form-data"
                                >
                                    <Input
                                        type="file"
                                        name="image"
                                        accept=".jpg,.jpeg,.png"
                                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-primary  mt-4 p-2"
                                        onChange={handleImageSelect}
                                    />

                                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                        <Button type="submit" className="flex-1">
                                            <FaSave className="mx-2" /> Save
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-400 hover:bg-gray-700 flex-1"
                                        >
                                            <FaTimes className="mx-2" /> Cancel
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
            </div>


        </DashboardContent>
    )
}

export default ProfileSettings