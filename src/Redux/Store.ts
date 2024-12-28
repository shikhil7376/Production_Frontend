import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AdminState, KennelState, UserState } from "../Interface/StateInterface";
import { PersistPartial } from "redux-persist/es/persistReducer";
import adminReducer from './Slices/AdminSlice'
import kennelReducer from './Slices/KennelSlice'
import userReducer from './Slices/AuthSlice'


export interface RootState{
   admin:AdminState,
   kennel:KennelState,
   user:UserState   
}

const rootReducers:Reducer<RootState>=combineReducers({
        user:userReducer,
        admin:adminReducer,
        kennel:kennelReducer
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer:Reducer<RootState & PersistPartial> = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer:persistedReducer
})

const persistor = persistStore(store)

export {store,persistor} 
