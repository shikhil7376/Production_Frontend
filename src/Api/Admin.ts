import api from '../Services/Axios'
import adminRoutes from '../Services/Endpoint/adminEndPoint'
import errorHandle from './Error'



export const getUsers = async(page:number,limit:number,searchTerm:string)=>{
    try {
        const response = await api.get(`${adminRoutes.getUserDetails}?page=${page}&limit=${limit}&search=${searchTerm}`)
        return response
    } catch (error) {
        return errorHandle(error)
    }   
}

export const blockUser = async (userId:string)=>{
    try{
    const response = await api.post(adminRoutes.blockUser,{userId})
       return response
    }catch(error){
        return errorHandle(error)
    }
}

export const unBlockUser = async (userId:string)=>{
    try {
        const response = await api.post(adminRoutes.unBlockUser,{userId})
        return response
    } catch (error) {
        return errorHandle(error)
    }  
}


export const getRequests = async(page:number,limit:number,searchTerm:string)=>{
    try {
        const response = await api.get(`${adminRoutes.getRequests}?page=${page}&limit=${limit}&search=${searchTerm}`)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const approveRequests = async(reqId:string)=>{
    try {
        const response = await api.post(adminRoutes.approveRequests,{reqId})
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const rejectRequests = async (reqId:string)=>{
    try {     
        const response = await api.post(adminRoutes.rejectRequests,{reqId})
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const getVerifiedkennelOwner = async(page:number,limit:number,searchTerm:string)=>{
    try {
        const data = await api.get(`${adminRoutes.getVerifiedkennelOwner}?page=${page}&limit=${limit}&search=${searchTerm}`)
        return data
    } catch (error) {
        return errorHandle(error)
    }
}

export const blockkennelowner = async (userId:string)=>{
    try{
       const response = await api.post(adminRoutes.blockkennelowner,{userId})
       return response
    }catch(error){
        return errorHandle(error)
    }
}

export const unblockkennelowner = async (userId:string)=>{
    try{
       const response = await api.post(adminRoutes.unblockkennelowner,{userId})
       return response
    }catch(error){
        return errorHandle(error)
    }
}

export const getDashboard = async()=>{
    try {
      const response = await api.get(adminRoutes.dashboard)
      return response
    } catch (error) {
      errorHandle(error)
    }
  }
