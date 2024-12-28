import api from "../Services/Axios";
import kennelRoutes from "../Services/Endpoint/kennelEndPoint";
import errorHandle from "./Error";
import { userData } from "../Interface/DatatypeInterface";
import { BookingDetails } from "../Interface/DatatypeInterface";

export const signup = async (userData: userData) => {
  try {
    const response = await api.post(kennelRoutes.signup, userData);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const otpVerify = async (
  otp: { otp: number },
  email: { email: string }
) => {
  try {
    const response = await api.post(kennelRoutes.userOtpVerify, {
      ...otp,
      ...email,
    });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const login = async (userData: userData) => {
  try {
    const response = await api.post(kennelRoutes.verifiedlogin, userData);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const resendOtp = async (userData: userData) => {
  try {
    const response = await api.post(kennelRoutes.resendotp, userData);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getProfile = async (Id: string) => {
  try {
    const response = await api.post(kennelRoutes.getProfile, { Id: Id });
    
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const addCages = async (data: FormData) => {
  try {
    const response = await api.post(kennelRoutes.addCages, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getCage = async () => {
  try {
    const response = await api.get(kennelRoutes.getCages);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const viewDetails = async (cageid: string) => {
  try {
    const response = await api.post(kennelRoutes.ViewDetails, { Id: cageid });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const booking = async (details:BookingDetails) => {
  try {
    const response = await api.post(kennelRoutes.booking, details);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const ownersCages = async (Id:string|undefined, page:number, limit:number, searchTerm:string) => {
  try {
    const response = await api.post(
      `${kennelRoutes.getOwnersCage}?page=${page}&limit=${limit}&search=${searchTerm}`,
      { Id: Id }
    );
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const editCages = async (data: FormData) => {
  try { 
    const response = await api.post(kennelRoutes.editCages, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const editProfile = async (data: FormData) => {
  try {
    const response = await api.post(kennelRoutes.editProfile, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getBookings = async (userid: string) => {
  try {
    const response = await api.post(kennelRoutes.getBookings, { userid });
    return response;
  } catch (error) {
    errorHandle(error);
  }
};

export const cancelBooking = async (bookingid: string, cageid: string) => {
  try {
    const response = await api.post(kennelRoutes.cancelBooking, {
      bookingid,
      cageid,
    });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getAllBookings = async()=>{
   try {
      const response = await api.get(kennelRoutes.getAllBookings)
      return response
   } catch (error) {
     errorHandle(error)
   }
}

export const getDashboard = async(id:string)=>{
  try {
    const response = await api.post(kennelRoutes.dashboard,{ownerId:id})
    return response
  } catch (error) {
    errorHandle(error)
  }
}