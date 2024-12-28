import { AdminData, AuthData, KennelData } from "./DatatypeInterface";


 export interface AdminState{
    admindata:AdminData | null
 }

 export interface UserState{
    userdata:AuthData | null
 }

 export interface KennelState{
   kennelOwnerData:KennelData| null
 }