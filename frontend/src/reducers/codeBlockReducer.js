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

export const codeBlocksListReducer = (state = {codesList: []}, action) => {

    switch (action.type) 
    {
        case CODES_LIST_REQUEST:
            return {loading:true};

        case CODES_LIST_SUCCESS:
            return {loading:false, codesList: action.payload};

        case CODES_LIST_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}

export const codeCreateReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case CODES_CREATE_REQUEST:
            return {loading:true};

        case CODES_CREATE_SUCCESS:
            return {loading:false, success: true};

        case CODES_CREATE_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}

export const codeUpdateReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case CODE_UPDATE_REQUEST:
            return {loading:true};

        case CODE_UPDATE_SUCCESS:
            return {loading:false, success: true};

        case CODE_UPDATE_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}


export const codeDeleteReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case CODE_DELETE_REQUEST:
            return {loading: true};

        case CODE_DELETE_SUCCESS:
            return {loading:false, success: true};

        case CODE_DELETE_FAIL:
            return {loading: false, error: action.payload, success: false};
    
        default:
            return state;
    }
}

export const codeStatsReducer = (state = {codeStats: []}, action) => {

    switch (action.type) 
    {
        case CODES_STATS_REQUEST:
            return {loading: true};

        case CODES_STATS_SUCCESS:
            return {loading:false, codeStats: action.payload};

        case CODES_STATS_FAIL:
            return {loading: false, error: action.payload};
    
        default:
            return state;
    }
}


