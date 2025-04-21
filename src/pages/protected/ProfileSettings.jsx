import { Button, DashboardContent, Form, Input, ProfileForm, UpdatePasswordForm } from "@components"
import { updateProfile } from "@features";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileImageschema } from "@schemas";
import { readFile } from "@services";
import { useEffect, useState } from "react";
import { FaSave, FaTimes,FaEdit   } from "react-icons/fa";
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
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
             <div className="bg-white shadow sm:rounded-lg p-4 h-full">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Picture</h2>
                <div className="items-center">
                <div className="relative w-48 h-48 mx-auto">
                    <img src={src} alt="display picture"  onClick={() => setIsEditing(true)} 
                    className="w-full h-full object-cover rounded-full cursor-pointer"/>
                    {/* <FaEdit className="absolute bottom-2 right-2 text-gray-600 cursor-pointer" onClick={()=>setIsEditing(true)}/> */}
                    </div>
                
                {isEditing && <Form onSubmit={handleProfilePictureChange} resolver={zodResolver(updateProfileImageschema)} encType="multipart/form-data">
                    <Input
                        type="file"
                        name="image"
                        label="Profile Photo"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageSelect}
                        
                    />

                   <div className="flex space-x-2">
                   <Button type="submit" className="w-[60%]">
                        <FaSave className="mx-2" />  Save
                    </Button>

                    <Button type="button" onClick={() => setIsEditing(false)}
                        className="bg-gray-500 hover:bg-gray-700 w-[60%] ps-8">
                        <FaTimes  className="mx-2"/> Cancel
                    </Button>
                   </div>
                </Form>}
             </div>
             </div>
              </div>
                <ProfileForm />
                  <UpdatePasswordForm />
            </div>
          </div>
         
        </DashboardContent>
    )
}

export default ProfileSettings