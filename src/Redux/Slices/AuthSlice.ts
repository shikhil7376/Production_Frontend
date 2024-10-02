import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../Interface/DatatypeInterface";
import { UserState } from "../../Interface/StateInterface";

const initialState:UserState ={
    userdata : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential:(state,action:PayloadAction<AuthData>)=>{
            console.log('action',action);
            
            state.userdata = action.payload 
        },
        clearUserdata:(state)=>{
            state.userdata = null
        }
    }
})

export const {setCredential,clearUserdata} = authSlice.actions

export default authSlice.reducer