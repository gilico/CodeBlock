import axios from "axios";
import {
    FOLDERS_LIST_FAIL,
    FOLDERS_LIST_REQUEST,
    FOLDERS_LIST_SUCCESS,
    FOLDER_CREATE_FAIL,
    FOLDER_CREATE_REQUEST,
    FOLDER_CREATE_SUCCESS,
    FOLDER_DELETE_FAIL,
    FOLDER_DELETE_REQUEST,
    FOLDER_DELETE_SUCCESS,
    FOLDER_UPDATE_FAIL,
    FOLDER_UPDATE_REQUEST,
    FOLDER_UPDATE_SUCCESS
} from "../constants/folderConstants";


export const listFolders = () => async(dispatch) => {
    try 
    {
        // set the loading to true
        dispatch({type: FOLDERS_LIST_REQUEST}); 

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { Authorization: `${user.token}`}};

        // get reauest from the api with 'config' for the auth middleware
        const data  = await axios.get('/api/myfolders', config);

        // if the request was succesfull then wull dispatch this action
        dispatch({
            type: FOLDERS_LIST_SUCCESS,
            payload: data.data
        });

    } 
    catch (err) 
    {
        let errMsgStr = errorHandler(err);
        dispatch({
            type: FOLDERS_LIST_FAIL,
            payload: errMsgStr
        })
    }
}


export const createFolderAction = (name, primeLang ) => async (dispatch) => {

    try 
    {
        dispatch({type: FOLDER_CREATE_REQUEST});
        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));
        
        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};
        
        const data  = await axios.post(
            `api/myfolders/create`,
            {name, primeLang}, 
            config
            );
            
        dispatch({type: FOLDER_CREATE_SUCCESS, payload: data});
    } 
    catch (err) 
    {
        let errMsgStr = errorHandler(err);
        dispatch({
            type: FOLDER_CREATE_FAIL,
            payload: errMsgStr
        })
    }
}


export const updateFolderAction = (folderid, name, primeLang) => async (dispatch) => {

    try 
    {
        dispatch({type: FOLDER_UPDATE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.put(
            `/api/myfolders/${folderid}`,
            {name, primeLang}, 
            config
        );

        dispatch({type: FOLDER_UPDATE_SUCCESS, payload: data});
    } 
    catch (err) 
    {
        let errMsgStr = errorHandler(err);
        dispatch({
            type: FOLDER_UPDATE_FAIL,
            payload: errMsgStr
        })
    }
}


export const deleteFolderAction = (folderid) => async (dispatch) => {
    
    try 
    {
        dispatch({type: FOLDER_DELETE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.delete(`/api/myfolders/${folderid}`, config);

        dispatch({type: FOLDER_DELETE_SUCCESS, payload: data});
    } 
    catch (err) 
    {
        let errMsgStr = errorHandler(err);

        dispatch({
            type: FOLDER_DELETE_FAIL,
            payload: errMsgStr
        })
    }
}



const errorHandler = (err) => {
    let resErr = err.response.data.errors;
    let errMsgStr = "";
    
    Object.values(resErr).forEach(error => {
        if(error !== "" || error !== null){
            errMsgStr += error + " ";
        }
    });

    return errMsgStr;
}