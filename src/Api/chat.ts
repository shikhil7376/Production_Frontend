import api from "../Services/Axios";
import chatRoutes from "../Services/Endpoint/chatEndPoint";
import errorHandle from "./Error";


export const createChat = async(currentId:string,userId:string)=>{
    try {
        const response = await api.post(chatRoutes.getchatUser,{currentId:currentId,userId:userId})
        return response
    } catch (error) {
        errorHandle(error)
    }
}

export const fetchChat = async(currentId: string)=>{
    try {      
        const response = await api.post(chatRoutes.fetchChat,{currentId:currentId})
        return response
    } catch (error) {
        errorHandle(error)
    }
}

export const getMessages = async(chatId: string)=>{
     try {
        const response = await api.post(chatRoutes.getMessages,{chatId:chatId})
        return response
     } catch (error) {
        errorHandle(error)
     }
}

export const sendMessage = async(data:FormData)=>{
    try {      
        const response = await api.post(chatRoutes.sendMessage,data)
        return response
        
        // const response = await api.post(chatRoutes.sendMessage,{userId: userId, content: content, chatId: chatId})
        // return response

        // const response = await api.post(chatRoutes.sendMessage,{data})
    } catch (error) {
      errorHandle(error)   
    }
}

export const deleteMessage = async(msgId)=>{
    try {
        const response = await api.post(chatRoutes.deleteMessage,{msgId}) 
        return response
    } catch (error) {
       errorHandle(error) 
    }
}