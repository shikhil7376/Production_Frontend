import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { KennelState } from "../../Interface/StateInterface";
import { KennelData } from "../../Interface/DatatypeInterface";

const initialState:KennelState = {
   kennelOwnerData:null
}

export const kennelSlice = createSlice({
      name:'KennelAuth',
      initialState,
      reducers:{
        setKennelCredential:(state,action:PayloadAction<KennelData>)=>{
            state.kennelOwnerData = action.payload
        },
        clearKenneldata:(state)=>{
           state.kennelOwnerData = null
        }
      }
})


export const {setKennelCredential,clearKenneldata} = kennelSlice.actions

export default kennelSlice.reducer