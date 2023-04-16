import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL="https://jsonplaceholder.typicode.com/users"

export const fetchUsers=createAsyncThunk("users/fetchUsers",async()=>{
    try {
        const response=await axios.get(BASE_URL);
        return response.data;    
    } catch (error) {
        console.log(error)
    }
    
})

const initialState=[]

const usersSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                if(action.payload){
                    return state.concat(action.payload)
                }
                
            })

    }
})

export const selectAllUsers=(state)=>state.users;

export default usersSlice.reducer 