import React from 'react'
import { Input } from "../../components/ui/input";
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import { editPost } from '../../Api/User';
import PacmanLoader from "react-spinners/PacmanLoader";


const EditPost = ({post,setSelectedCard,setPostData,onClose}) => {
    const [editPostData,setEditPostData] = useState(post)  
    const [loading, setLoading] = useState<boolean>(false);

    const handleDescriptionChange =(e)=>{
        setEditPostData({...editPostData,description:e.target.value})
    }

    const urlToFile = async (url: string): Promise<File> => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split('/').pop() || 'editPost';
        return new File([blob], fileName, { type: blob.type });
      };
    
    const handleImageDelete = (image: string) => {
        setEditPostData((prev) => ({
          ...prev,
          images: prev?.images?.filter((img) => img !== image),
        }));
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const fileArray: File[] = Array.from(e.target.files);
          const urlArray: string[] = fileArray.map((file) => URL.createObjectURL(file));
    
          setEditPostData((prev) => {
            const existingImages = prev?.images || [];
            const totalImages = existingImages.length + urlArray.length;
    
            if (totalImages > 3) {
              const imagesToAdd = 3 - existingImages.length;
              return {
                ...prev,
                images: [...existingImages, ...urlArray.slice(0, imagesToAdd)],
              };
            }
    
            return {
              ...prev,
              images: [...existingImages, ...urlArray],
            };
          });
        }
      };

      const getUpdatedFields = () => {
        const updatedFields: { description?: string; images?: string[] } = {};
      
        if (post.description !== editPostData.description) {
          updatedFields.description = editPostData.description;
        }
      
        if (JSON.stringify(post.images) !== JSON.stringify(editPostData.images)) {
          updatedFields.images = editPostData.images;
        }
      
        return updatedFields;
      };

      const handlePostUpdate =(data)=>{  
       setPostData((prevPosts)=>{
          return prevPosts.map((post)=>
        post.id ===data.id?data:post
        )      
       })
      }

      const handleSavePost = async()=>{
        const updatedFields = getUpdatedFields(); 
         if(Object.keys(updatedFields).length>0){
            try {
                const formData = new FormData();
                formData.append('description', editPostData.description);
                for (const img of editPostData.images) {
                    const file = await urlToFile(img);
                    formData.append('editPost', file);
                  }
                setLoading(true)
               const response = await editPost(editPostData.id,formData)               
               if(response){
                setLoading(false)
                setSelectedCard(response?.data.data)
                handlePostUpdate(response?.data.data)
                 onClose()
               }
            } catch (error) {
                
            }
         }
      }
    
  return (
    <div className=' p-5 gap-5 flex flex-col items-center b w-[400px]'>
        <div className='flex justify-start text-gray-500 font-semibold '>
        Edit post
        </div>
        <div className='w-[80%] '>
            <Input type='text' placeholder='description' value={editPostData.description}  onChange={handleDescriptionChange} />
            <div className="mb-4 flex flex-wrap">
                    {editPostData?.images?.map((img, index) => (
                      <div key={index} className='relative m-2'>
                        <img src={img} alt={`Cage Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                        <button
                          type="button"
                          className="mt-1 p-1 bg-red-500 text-white rounded-full"
                          onClick={() => handleImageDelete(img)}
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                  {editPostData?.images && editPostData.images.length < 3 && (
                    <Input className='flex justify-center items-center h-[50px] '
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange} />
                  )}
        </div>
        <div className='w-full flex justify-end'>
        <button
        className='mt-4 p-2 bg-blue-500 text-white rounded'
        onClick={handleSavePost}
     >
        Save Post
      </button>
      </div>
      {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <PacmanLoader size={40} color="#ffffff" />
                </div>
            )}
    </div>
  )
}

export default EditPost
