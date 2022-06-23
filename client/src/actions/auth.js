import * as api from '../api';
import { AUTH } from '../constants/actionType';

export const signIn = (formData, navigate) => async(dispatch) =>{
    try{
        //log in the user 
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH, data});
        navigate("/");
    } catch (error){
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async(dispatch) =>{
    try{
        //sign up the user 
        const {data} = await api.signUp(formData);
        
        dispatch({type:AUTH, data});
        navigate("/");
    } catch (error){
        console.log(error);
    }
}