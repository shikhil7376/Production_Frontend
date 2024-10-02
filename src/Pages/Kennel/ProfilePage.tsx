import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProfile, editProfile } from '../../Api/Kennel';
import {  Avatar } from '@nextui-org/react';
import { Input } from '../../components/ui/input';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { RootState } from '../../Redux/Store';
import errorHandle from '../../Api/Error';
import { Errors, profile } from '../../Interface/DatatypeInterface';
import PacmanLoader from "react-spinners/PacmanLoader";



const ProfilePage = () => {
  const [profile, setProfile] = useState<profile>()
  const [initialData, setInitialData] = useState<profile>()
  const [errors, setErrors] = useState<Errors>({});
  const [selectedFile, setSelectedFile] = useState<File>();
  const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);
  const [loading,setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!profile?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profile?.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (profile.phone.length < 10 || profile.phone.length > 10) {
      newErrors.phone = 'Phone number must contain 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchProfile = async () => {
    try {
      if (!kennelOwnerData?._id) throw new Error("kennelOwnerData._id is undefined");
      const response = await getProfile(kennelOwnerData?._id);
      setProfile(response?.data.message);
      setInitialData(response?.data.message);
    } catch (error) {
      errorHandle(error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0]
      setSelectedFile(file)
      const url: string = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        image: url
      }))
    }
  }

  const handleChanges = async () => {
    const isValid = validateForm();
    if (isValid && profile && initialData) {
      if (JSON.stringify(profile) !== JSON.stringify(initialData)) {
        setLoading(true); // Start loading

        try {
          const formData = new FormData();
          if (profile._id) formData.append('id', profile._id);
          if (profile.name) formData.append('name', profile.name);
          if (profile.email) formData.append('email', profile.email);
          if (profile.phone) formData.append('phone', profile.phone);
          if (selectedFile) {
            formData.append('ownerimage', selectedFile);
          }
          const response = await editProfile(formData);
          if (response) {
            fetchProfile()
            toast.success('Profile updated successfully');
          }
        } catch (error) {
          toast.error('Failed to update profile');
          errorHandle(error)
        } finally {
          setLoading(false);
      }
      }
    }
  }

  return (
    <div className='w-full flex justify-center items-center bg-white'>
      <div className='border-1 h-[450px] w-[350px] rounded-lg mt-[30px] bg-white flex flex-col items-center p-4 drop-shadow-xl'>
        <div className='p-5'>
          <Avatar src={profile?.image || ''} className='w-20 h-20 text-large' />
          <FaUpload onClick={() => document.getElementById('fileInput')?.click()} />
          <input id='fileInput' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
        </div>

        <div className='mt-4 flex flex-col items-center gap-3 font-roboto'>
          <Input type='text' placeholder='Name' value={profile?.name} name='name' onChange={handleInputChange} className=' text-gray-500' />
          <Input type='text' placeholder='Email' value={profile?.email} name='email' readOnly className=' text-gray-500' />
          <Input type='text' placeholder='Phone' value={profile?.phone} name='phone' onChange={handleInputChange} className=' text-gray-500' />
          {errors.phone && <p className='mt-2 text-sm font-roboto text-red-600'>{errors.phone}</p>}
          {errors.name && <p className='mt-2 text-sm font-roboto text-red-600'>{errors.name}</p>}
        </div>
        <div className='p-3'>
          <button onClick={handleChanges} disabled={loading}  className='bg-purplebutton text-white font-roboto p-2  text-center rounded-lg text-small'>{loading ? 'SAVING...' : 'SAVE CHANGES'}</button>
        </div>
      </div>
      {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <PacmanLoader size={40} color="#ffffff" />
                </div>
            )}
    </div>
  )
}

export default ProfilePage
