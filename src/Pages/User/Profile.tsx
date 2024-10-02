import React from 'react'
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FaUpload } from 'react-icons/fa';
import { getProfile, editProfile } from '../../Api/User';
import { toast } from 'react-toastify';
import { RootState } from '../../Redux/Store';
import { Errors, profile } from '../../Interface/DatatypeInterface';
import errorHandle from '../../Api/Error';
import PacmanLoader from "react-spinners/PacmanLoader";
import FocusCardsDemo from '../../components/Socialmedia/FocusCardsDemo';
import { setCredential } from '../../Redux/Slices/AuthSlice';
import { useParams } from 'react-router-dom';
import FollowersList from '../../components/Socialmedia/FollowersList';


const Profile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState<profile>()
    const [initialData, setInitialData] = useState<profile>()
    const [errors, setErrors] = useState<Errors>({});
    const [selectedFile, setSelectedFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const userData = useSelector((state: RootState) => state.user.userdata)
    const [postData,setPostData] = useState()
    const [openModal,setOpenModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>('');

    const dispatch = useDispatch();

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

    const fetchData = async () => {
        if (userId) {
            try {
                const response = await getProfile(userId);
                if(response){
                    setProfile(response?.data.message);
                    setInitialData(response?.data.message);
                    setPostData(response?.data.message.posts)
                }
            } catch (error) {
                toast.error('Failed to fetch profile data');
            }
        } else {
            toast.error('User data is not available');
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

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
                        formData.append('userimage', selectedFile);
                    }
                    const response = await editProfile(formData);
                    if (response) {
                        setProfile(response.data.data)
                        dispatch(setCredential(response.data.data))
                        toast.success('Profile updated successfully');
                    }
                } catch (error) {
                    toast.error('Failed to update profile');
                    errorHandle(error);
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    const toggleModal = (type: string) => {
        setModalType(type); // Set the type of modal (followers/following)
        setOpenModal(true); // Open modal
    };

    return (
        <div className='h-auto'>
            <div className='display flex '>
                <div className='w-1/3 bg-slate-3  flex justify-center  '>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <Avatar isBordered color="default" src={profile?.image || ''}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <FaUpload onClick={() => document.getElementById('fileInput')?.click()} />
                        <input id='fileInput' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
                        <div className='display flex gap-2'>
                        <p className='text-sm  text-gray-500' onClick={() => toggleModal('followers')}>followers:{profile?.followers}</p>
                        <p className='text-sm  text-gray-500' onClick={() => toggleModal('following')}>following:{profile?.following}</p>
                        </div>
                    </div>
                    
                </div>
                <div className='w-2/3  flex flex-col justify-center'>
                    <div className='sm:w-[35%] p-2 flex flex-col gap-3 '>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={profile?.name}
                            onChange={handleInputChange}
                            className="shadow appearance-none  border-none  rounded-full text-gray-500 w-full py-2 px-6 leading-tight focus:outline-none focus:shadow-outline text-small backdrop-blur-sm bg-white/30 placeholder-black"
                            placeholder="Enter your name"
                        />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={profile?.email}
                            readOnly
                            className="shadow appearance-none  border-none rounded-full w-full text-gray-500 py-2 px-6 leading-tight focus:outline-none focus:shadow-outline text-small backdrop-blur-sm bg-white/30 placeholder-black"
                            placeholder="Enter your email"
                        />
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={handleInputChange}
                            value={profile?.phone}
                            className="shadow appearance-none border-none text-gray-500 rounded-full w-full py-2 px-6 leading-tight focus:outline-none focus:shadow-outline text-small backdrop-blur-sm bg-white/30 placeholder-black"
                            placeholder="Enter your phone"
                        />
                                  {errors.phone && <p className='mt-2 text-sm font-semibold text-red-600'>{errors.phone}</p>}
                                  {errors.name && <p className='mt-2 text-sm font-semibold text-red-600'>{errors.name}</p>}
                        <button onClick={handleChanges} disabled={loading}  className='bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] text-white font-semibold p-2  text-center rounded-full text-small'> {loading ? 'SAVING...' : 'SAVE CHANGES'}</button>

                    </div>

                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <PacmanLoader size={40} color="#ffffff" />
                </div>
            )}
            <div className='border-t border-gray-300 mt-10 '></div> {/* This is the line */}
            <div className='mt-5 p-5'>
                <FocusCardsDemo postData ={postData} userId={userId} setPostData={setPostData}/>
            </div>
            <FollowersList isOpen={openModal} onClose={() => setOpenModal(false)} modalType={modalType} id={userId}/>
        </div>
    )
}

export default Profile
