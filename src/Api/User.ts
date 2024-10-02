import api from "../Services/Axios";
import userRoutes from "../Services/Endpoint/userEndPoint";
import errorHandle from "./Error";
import { userData } from "../Interface/DatatypeInterface";

export const signup = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.signup, userData);
    console.log(response);
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const otpVerify = async (
  otp: { otp: number },
  email: { email: string }
) => {
  try {
    const response = await api.post(userRoutes.userOtpVerify, {
      ...otp,
      ...email,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const login = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.userLogin, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const resendOtp = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.resendotp, userData);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(userRoutes.forgotpassword, { email });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const forgotPasswordOtp = async (
  otp: { otp: number },
  email: { email: string }
) => {
  try {
    const response = await api.post(userRoutes.verifyforgototp, {
      ...otp,
      ...email,
    });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const resentforgototp = async (email: string) => {
  try {
    const response = await api.post(userRoutes.verifyforgotresendotp, {email});
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const resetpassword = async (data: userData) => {
  try {
    const response = await api.post(userRoutes.resetpassword, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getProfile = async (Id: string) => {
  try {
    const response = await api.get(`${userRoutes.getProfile}/${Id}`);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const editProfile = async (data:FormData) => {
  try {
    const response = await api.post(userRoutes.editProfile, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const addPost = async(data:FormData) => {
  try{    
  const response = await api.post(userRoutes.addpost,data)
  return response
  }catch(error){
    errorHandle(error)
  }
}

export const getPosts = async()=>{
  try {
    const response = await api.get(userRoutes.getPosts)    
    return response
  } catch (error) {
    errorHandle(error)
  }
}

export const likePost = async(postId:string,userId:string)=>{
  try {
     const response = await api.post(`${userRoutes.likePost}/${postId}`,{userId:userId})
     return response
  } catch (error) {
    errorHandle(error)
  }
}

export const commentPost = async (postId:string,userId:string,comment:string)=>{
  try {
    const response = await api.post(userRoutes.commentPost,{postId:postId,userId:userId,comment:comment})
    return response
  } catch (error) {
    errorHandle(error)
  }
}

export const getAllComments = async(postId:string)=>{
  try {    
     const response = await api.post(userRoutes.getAllComments,{postId:postId})
     return response
  } catch (error) {
     errorHandle(error)
  }
}

export const follow = async(userId:string,targetId:string)=>{
    try {
        const response = await api.post(userRoutes.follow,{userId:userId,targetId:targetId})
        return response
    } catch (error) {
      errorHandle(error)
    }
}

export const userNotFollow = async(userId:string)=>{
  try {
    const response = await api.post(userRoutes.getUserNotFollowed,{userId:userId})
    return response
  } catch (error) {
    errorHandle(error)
  }
}

export const getchatUser = async(userId:string,searchItem:string)=>{
  try {
    const response = await api.post(`${userRoutes.getchatUsers}?search=${searchItem}`,{userId:userId})
    return response
  } catch (error) {
    errorHandle(error)
  }
}

export const editPost = async(id:string,data:FormData)=>{
  try { 
      const response = await api.patch(`${userRoutes.editPost}/${id}`,data)     
      return response
  } catch (error) {
    errorHandle(error)
  }
}

export const deletePost = async(id:string)=>{
   try { 
    const response = await api.delete(`${userRoutes.deletePost}/${id}`)
    return response
   } catch (error) {
    errorHandle(error)
   }
}

export const getFollowers = async(id:string)=>{
  try {
    const response = await api.get(`${userRoutes.getFollowers}/${id}`)
    return response
  } catch (error) {
    errorHandle(error)
  }
}

export const getFollowing = async(id:string)=>{
  try {
    const response = await api.get(`${userRoutes.getFollowing}/${id}`)
    return response
  } catch (error) {
    errorHandle(error)
  }
}