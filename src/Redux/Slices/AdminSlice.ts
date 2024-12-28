import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../../Interface/StateInterface";
import { AdminData } from "../../Interface/DatatypeInterface";

const initialState:AdminState = {
    admindata:null
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setAdminCredential:(state,action:PayloadAction<AdminData>)=>{
            state.admindata = action.payload
        },
        clearAdminData:(state)=>{
            state.admindata = null
        }
    }
})

export const {setAdminCredential,clearAdminData} = adminAuthSlice.actions
export default adminAuthSlice.reducer