import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer} from './reducers/userReducers';
import { codeBlocksListReducer, codeCreateReducer, codeDeleteReducer, codeStatsReducer, codeUpdateReducer } from './reducers/codeBlockReducer'
import { createFoldersReducer, folderDeleteReducer, foldersListReducer, folderUpdateReducer } from './reducers/foldersReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister:  userRegisterReducer,
    folderList: foldersListReducer,
    createFolder: createFoldersReducer,
    folderUpdate: folderUpdateReducer,
    deleteFolder: folderDeleteReducer,
    codesList: codeBlocksListReducer,
    codeCreate: codeCreateReducer,
    codeUpdate: codeUpdateReducer,
    codeDelete: codeDeleteReducer,
    codeStatsRed:codeStatsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ?JSON.parse(localStorage.getItem('userInfo'))
    :null;



const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;