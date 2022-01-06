import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { createFolderAction, deleteFolderAction, listFolders, updateFolderAction } from '../../actions/folderAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './MyFoldersStyle.css';
import garbageImg from '../../images/garbage.png';
import pencil from '../../images/pencil.png';

const MyFolders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showNew, setShowNew] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(-1);
    const [formToShow, setFormToShow] = useState(-1);
    const [name, setName] = useState("");
    const [primeLang, setPrimeLang] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const folderList = useSelector(state => state.folderList);
    const { loading,folders, error } = folderList;

    const createFolder = useSelector(state => state.createFolder);
    const { loading:createLoading, error:createError } = createFolder;

    const folderUpdate = useSelector(state => state.folderUpdate)
    const { loading: updateLoading, error: updateError, success: updateSuccess} = folderUpdate;


    const deleteFolder = useSelector(state => state.deleteFolder);
    const { error: deleteError, success: successDelete} = deleteFolder;
    
    const newFolderHandler = () => {
        setShowNew(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(!name || !primeLang) return;

        dispatch(createFolderAction(name, primeLang));
        resetHandler();
        navigate(0);
    }

    const resetHandler = () => {
        setName("");
        setPrimeLang("");
        
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure Tou Want To Delete This Folder?')){
            dispatch(deleteFolderAction(id));
        }
    }

    
    const updateHandler = (id) => {
        if(!name || !primeLang) return;

        dispatch(updateFolderAction(id, name, primeLang));
        
        resetHandler();
    }



    useEffect(() => {
        if(!userInfo)
        {
            navigate('/signup');
        }
       
        dispatch(listFolders());

    }, [dispatch, navigate, userInfo, successDelete, successDelete, updateSuccess]);

  

    return (
        <MainScreen title={userInfo && `${userInfo.name}'s Folders`}>
            <div className='add-folder' onClick={newFolderHandler}>Create Folder<span>+</span></div>
            { error && <ErrorMessage>{ error }</ErrorMessage>}
            { createError && <ErrorMessage>{ createError }</ErrorMessage>}
            { deleteError && <ErrorMessage>{ deleteError }</ErrorMessage>}
            { updateError && <ErrorMessage>{ updateError }</ErrorMessage>}
            { loading && <Loading/>}
            { createLoading && <Loading/>}
            { updateLoading && <Loading/>}

            {/* load all user's folders */}
            <div className="folders-container">
                {folders?.map((folder, i) => (
                    <div className="folder-master" 
                        key={folder._id}
                        onMouseEnter={() => setHoveredIdx(i)} 
                        onMouseLeave={() => setHoveredIdx(-1)}
                    >
                        <Link to={`/myfolders/${folder._id}/mycodes`}>
                            <div className="folder-wrap">
                                <div className='folder'>
                                    <div className="inner-folder">
                                        <p>{folder.name}</p>
                                        <p className='prime-lang'>{folder.primeLang}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="folder-footer" style={hoveredIdx === i?{display:'block'}:{display:'none'}}>
                            <img src={garbageImg} alt="delete" className='delete-folder' onClick={()=>deleteHandler(folder._id)}/>
                            <img src={pencil} alt="edit" className='delete-folder edit-folder' onClick={()=> setFormToShow(i) }/>
                        </div>
                {/* ----update folder section to each folder---- */}
                        <div className="update-container newfolder" style={formToShow=== i?{display:'block'}:{display:'none'}} key={i}
                            display={formToShow===i? 'block':'none'}
                        >
                            <form onSubmit={()=> updateHandler(folder._id)}>
                                <label>Name
                                    <input type="text" name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                                <label>Primery Language
                                    <input type="text" name="primeLang" 
                                        value={primeLang}  
                                        onChange={(e) => setPrimeLang(e.target.value)}
                                    />
                                </label>
                                <div className="update-footer">
                                    <button>Update</button>
                                    <div className='cancel-update' onClick={()=>{setFormToShow(-1)}}>Cancel</div>
                                </div>
                            </form>
                        </div>
                    </div>
                ))}
                {/* new folder section */}
                { showNew && <form className='create-folder-form' onSubmit={submitHandler}>
                    <div className="folder-wrap newfolder-wrap">
                        <div className='folder newfolder-folder'>
                            <div className="inner-folder newfolder">
                                <label>Name
                                    <input type="text" name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Primery Language
                                    <input type="text" name="primeLang"
                                        value={primeLang}
                                        onChange={(e) => setPrimeLang(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="update-footer">
                        <button>Create</button>
                        <div className='cancel-update cancel-new' onClick={()=>{setShowNew(false)}}>Cancel</div>
                    </div>
                </form>}
                
            </div>
        </MainScreen>
    )
}



export default MyFolders
