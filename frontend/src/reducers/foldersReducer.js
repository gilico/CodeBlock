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


export const foldersListReducer = (state = {folders: []}, action) => {

    switch (action.type) 
    {
        case FOLDERS_LIST_REQUEST:
            return {loading:true};

        case FOLDERS_LIST_SUCCESS:
            return {loading:false, folders: action.payload};

        case FOLDERS_LIST_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}

export const createFoldersReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case FOLDER_CREATE_REQUEST:
            return {loading:true};

        case FOLDER_CREATE_SUCCESS:
            return {loading:false, success: true};

        case FOLDER_CREATE_FAIL:
            return {loading:false, error: action.payload, success: false};
    
        default:
            return state;
    }
}

export const folderUpdateReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case FOLDER_UPDATE_REQUEST:
            return {loading:true};

        case FOLDER_UPDATE_SUCCESS:
            return {loading:false, success: true};

        case FOLDER_UPDATE_FAIL:
            return {loading:false, error: action.payload, success: false};
    
        default:
            return state;
    }
}

export const folderDeleteReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case FOLDER_DELETE_REQUEST:
            return {loading: true};

        case FOLDER_DELETE_SUCCESS:
            return {loading:false, success: true};

        case FOLDER_DELETE_FAIL:
            return {loading: false, error: action.payload, success: false};
    
        default:
            return state;
    }
}