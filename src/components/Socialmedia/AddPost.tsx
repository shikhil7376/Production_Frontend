import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "../../components/ui/input";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../Redux/Store";
import PacmanLoader from "react-spinners/PacmanLoader";
import { FaUpload } from 'react-icons/fa';
import errorHandle from "../../Api/Error";
import { PostError } from "../../Interface/DatatypeInterface";
import { addPost } from "../../Api/User";


type addPostProps = {
  fetchData: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
};

const AddPost: React.FC<addPostProps> = ({ isOpen, onClose,fetchData }) => {
    const [loading, setLoading] = useState(false);
    const [description,setDescription] = useState<string>("")
    const [images, setImages] = useState<File[]>([]);
    const [errors, setErrors] = useState<PostError>({});

    const userData = useSelector((state: RootState) => state.user.userdata)

   const validateForm = ()=>{
     const newError:PostError ={}
      if(!description.trim()){
        newError.description ="Description is required"
      }
      if(images.length<1){
        newError.images = "Images are required"
      }
      setErrors(newError)
      return Object.keys(newError).length === 0;

   }

    const handleFileChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
       if(e.target.files){
        const filesArray = Array.from(e.target.files);
        setImages((prev) => {
            const remainingSlots = 3 - prev.length;
            const newFiles = filesArray.slice(0, remainingSlots);
            return [...prev, ...newFiles];
          });
       }
    }

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    const isValid = validateForm();
    if(isValid){
        const formData = new FormData();
        formData.append("description", description);
      if(userData && userData._id)  formData.append("userid",userData?._id)
        images.forEach((file) => formData.append("postimages", file));
       try {
          setLoading(true)
          const response = await addPost(formData);
            fetchData()
            onClose()
           if(response){
            toast.success(response.data.message)
            setLoading(false)
           }
       } catch (error) {
        errorHandle(error)
        setLoading(false)
       }
    }
  }


  return (
   <>
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <PacmanLoader size={40} color="#ffffff" />
        </div>
      )}

      {!loading && (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onClose} 
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">ADD POST</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit} >
                    <div className="flex flex-col gap-3">
                      <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <div className="display flex gap-3">
                        <p className="text-sm text-gray-500">upload image</p>
                      <FaUpload onClick={() => document.getElementById('fileInput')?.click()} />
                      <input id='fileInput' type='file' multiple onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((file, index) => (
                          <div key={index} className="w-25 h-25 border-1 border-black-500 rounded-lg overflow-hidden">
                            <img src={URL.createObjectURL(file)} alt={`profile-pic-${index}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button className="bg-black text-white font-semibold text-small" type="submit">
                        Upload Post
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
   </>
  )
}

export default AddPost
