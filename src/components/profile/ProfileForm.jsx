import { Button, Form, Input } from "@components";
import { updateProfile } from "@features";
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
                setIsEditing(false);
            } return;
        }
        setIsEditing(false);
    }

    const renderViewMode = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-lg font-semibold break-words">{profile?.name}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <p className="text-lg font-semibold break-words">{profile?.email}</p>
                </div>
                {profile?.cnic && <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">CNIC No.</label>
                    <p className="text-lg font-semibold break-words">{profile?.cnic ?? "Not Provided"}</p>
                </div>}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-lg font-semibold break-words">{profile?.phone ?? "Not provided"}</p>
                </div>
                {profile?.rollNo && <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Roll No.</label>
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

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
                name="name"
                label="Full Name"
                placeholder="Your full name"
                value={profile?.name ?? undefined}
            />
            <Input
                name="email"
                label="Email Address"
                placeholder="Your email address"
                value={profile?.email ?? undefined}
            />
           
            {profile?.cnic && <Input
                name="cnic"
                label="CNIC No."
                value={profile?.cnic ?? undefined}
                placeholder="Your cnic no."
                disabled={true}
            />}
            <Input
                name="phone"
                label="Phone Number"
                placeholder="Your phone number"
                value={profile?.phone ?? undefined}
            />
            
            {profile?.rollNo && <Input
                name="rollNo"
                label="Roll No."
                value={profile.rollNo ?? undefined}
                placeholder="Your roll no."
                disabled={true}
            />}
        
           
           <Button type="submit">
                <FaSave /> Save Changes
            </Button>

            <Button type="button" onClick={() => { setIsEditing(false); }} className=" bg-gray-500 hover:bg-gray-700">
                <FaTimes /> Cancel
            </Button>
           </div>
        </Form>
          
       
    
    );

    return (
        <div className="bg-white shadow sm:rounded-lg p-4 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            {isEditing ? renderEditMode() : renderViewMode()}
        </div>
    );
};

export default ProfileForm;
