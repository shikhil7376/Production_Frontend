import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { MdReportProblem } from "react-icons/md";
import { toast } from "react-toastify";
import errorHandle from "../../Api/Error";
import { reportPost } from "../../Api/User";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const ReportModal = ({ postId,postUserId,reported, fetchReports,setreport }) => {
    const {isOpen,onOpen,onOpenChange} = useDisclosure()
    const [description,setDescription] = useState('')
    const userData = useSelector((state: RootState) => state.user.userdata);


    const handleSubmit = async(onClose)=>{
      if(!description.trim()){
        toast.error('report should not be empty')
      }
      try {
         const response = await reportPost(postId,userData?._id as string,description)
         if(response){
          toast.success('Report Submitted')
          setreport(true)
          fetchReports()
          onClose()
         }   
      } catch (error) {
        errorHandle(error)
      }
    }
    
  return (
         <>
         {postUserId!==userData?._id &&(
           <MdReportProblem
           color={reported ? 'gray' : 'red'}
           size={17}
           onClick={!reported ? onOpen : undefined}  // Disable click if already reported
       />
         )}
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange} 
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          }}
        >
          <ModalContent className="rounded-none">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Report</ModalHeader>
                <ModalBody>
                  <input type="text" placeholder="enter description" className="text-sm w- rounded-lg"
                   onChange={(e)=>setDescription(e.target.value)}/>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button className="bg-black text-white font-semibold text-small" type="submit"  onClick={()=>handleSubmit(onClose)}>
                        Submit
                      </Button>
                    </ModalFooter>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      
    </>
  )
}

export default ReportModal
