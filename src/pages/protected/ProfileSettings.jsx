import { Button, DashboardContent, Form, Input, ProfileForm, UpdatePasswordForm } from "@components"
import { updateProfile } from "@features";
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
        if (updateProfile.fulfilled.match(result)) setIsEditing(false);
    }

    const handleImageSelect = ({ target }) => {
        const file = target.files?.[0];
        if (file) setSrc(URL.createObjectURL(file));
    }

    return (
        <DashboardContent title="Profile" description="Manage your profile settings and changes">
            <div>
                <h2>Profile Picture</h2>
                <img src={src} alt="display picture" width={60} onClick={() => setIsEditing(true)} />
                {isEditing && <Form onSubmit={handleProfilePictureChange} resolver={zodResolver(updateProfileImageschema)} encType="multipart/form-data">
                    <Input
                        type="file"
                        name="image"
                        label="Profile Photo"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageSelect}
                    />

                    <Button type="submit">
                        <FaSave /> Save
                    </Button>

                    <Button type="button" onClick={() => setIsEditing(false)}>
                        <FaTimes /> Cancel
                    </Button>
                </Form>}
            </div>

            <div>
                <ProfileForm />
                <UpdatePasswordForm />
            </div>
        </DashboardContent>
    )
}

export default ProfileSettings