import axios from "axios";
import {
    CODES_CREATE_FAIL,
    CODES_CREATE_REQUEST,
    CODES_CREATE_SUCCESS,
    CODES_LIST_FAIL, 
    CODES_LIST_REQUEST, 
    CODES_LIST_SUCCESS,
    CODES_STATS_FAIL,
    CODES_STATS_REQUEST,
    CODES_STATS_SUCCESS,
    CODE_DELETE_FAIL,
    CODE_DELETE_REQUEST,
    CODE_DELETE_SUCCESS,
    CODE_UPDATE_FAIL,
    CODE_UPDATE_REQUEST,
    CODE_UPDATE_SUCCESS
} from "../constants/codeBlockConstants";

export const listCodes = (folderId) => async(dispatch) => {
    try 
    {
        // set the loading to true
        dispatch({type: CODES_LIST_REQUEST}); 

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { Authorization: `${user.token}`}};

        // get reauest from the api with 'config' for the auth middleware
        const data  = await axios.get(`/api/myfolders/${folderId}/mycodes`, config);

        // if the request was succesfull then wull dispatch this action
        dispatch({
            type: CODES_LIST_SUCCESS,
            payload: data.data
        });
    } 
    catch (error) 
    {
        dispatch({
            type: CODES_LIST_FAIL,
            payload: error
        })
    }
}

export const createCodeAction = (folderId, title, language,tags, code, explanation ) => async (dispatch) => {

    try 
    {
        dispatch({type: CODES_CREATE_REQUEST});
        
        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.post(
            `/api/myfolders/${folderId}/mycodes/create`,
            {title, language,tags, code, explanation}, 
            config
        );

        dispatch({type: CODES_CREATE_SUCCESS, payload: data});
    } 
    catch (err) 
    {
        console.log(err.response);
        dispatch({
            type: CODES_CREATE_FAIL,
            payload: err
        })
    }
}

export const updateCodeAction = (folderId,codeId, title, language,tags, code, explanation ) => async (dispatch) => {

    try 
    {
        dispatch({type: CODE_UPDATE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.put(
            `/api/myfolders/${folderId}/mycodes/${codeId}`,
            {title, language,tags, code, explanation}, 
            config
        );

        dispatch({type: CODE_UPDATE_SUCCESS, payload: data});
    } 
    catch (error) 
    {
        dispatch({
            type: CODE_UPDATE_FAIL,
            payload: error
        })
    }
}

export const deleteCodeAction = (folderid, id) => async (dispatch) => {

    try 
    {
        dispatch({type: CODE_DELETE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.delete(`/api/myfolders/${folderid}/mycodes/${id}`, config);

        dispatch({type: CODE_DELETE_SUCCESS, payload: data});
    } 
    catch (error) 
    {
        dispatch({
            type: CODE_DELETE_FAIL,
            payload: error
        })
    }
}

export const codesStatsAction = () => async(dispatch) => {
    try 
    {
        // set the loading to true
        dispatch({type: CODES_STATS_REQUEST}); 

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { Authorization: `${user.token}`}};

        // get reauest from the api with 'config' for the auth middleware
        const data  = await axios.get('/api/myfolders/allmycodes', config);

        // if the request was succesfull then wull dispatch this action
        dispatch({
            type: CODES_STATS_SUCCESS,
            payload: data.data
        });
    } 
    catch (error) 
    {
        dispatch({
            type: CODES_STATS_FAIL,
            payload: error
        })
    }
}