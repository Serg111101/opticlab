import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetchingClip, fetchSuccessClip, fetchErrorClip } from "../slices/ClipSlice";

export const fetchClip = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingClip());
            const response =await axios.get('http://localhost:3000/api/v1/superAdmin/styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            console.log(arr);
            
            dispatch(fetchSuccessClip(arr));   
        }
        catch(error){
            
            dispatch(fetchErrorClip(error as Error));
        }

    }
}
