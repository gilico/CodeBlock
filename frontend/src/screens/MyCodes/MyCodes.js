import Button from '@restart/ui/esm/Button';
import React, {useState, useEffect} from 'react';
import { Accordion } from 'react-bootstrap';
import {Link , useNavigate, useParams} from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import './MyCodeStyle.css';
import {deleteCodeAction, listCodes} from '../../actions/codesAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import AceEditor from 'react-ace';
import arrow from '../../images/arrow.png';
import "ace-builds/src-noconflict/mode-javascript";
import fullScreenImg from '../../images/fullscreen.png';
import normalScreenImg from '../../images/normalscreen.png';
import searchImg from "../../images/search.png";

const languages = [
  "javascript",
  "java",
  "python",
  "c_cpp",
  "xml",
  "ruby",
  "sass",
  "mysql",
  "json",
  "html",
  "csharp",
  "typescript",
  "css"
];
const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];
languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const MyCodes = () => {

    const { id: folderid } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const codesList = useSelector(state => state.codesList);
    const { loading,codesList: list, error } = codesList;

    const codeCreate = useSelector(state => state.codeCreate);
    const { success: seccessCreate } = codeCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    
    const codeDeleteReducer = useSelector(state => state.codeDelete);
    const { error: errorDelete, success: successDelete} = codeDeleteReducer;

    const deleteHandler = async (id) => {
        if(window.confirm('Are You Sure Tou Want To Delete This Code?')){
            dispatch(deleteCodeAction(folderid, id));
        }
    }

    const SetLanguageToShow = (language) => {
        switch (language) {
            case 'javascript':
                return 'JavaScript';
            case 'java':
                return 'Java';
            case 'python':
                return 'Python';
            case 'c_cpp':
                return 'C / C++';
            case 'xml':
                return 'XML';
            case 'ruby':
                return 'Ruby';
            case 'sass':
                return 'Sass';
            case 'mysql':
                return 'MySQL';
            case 'json':
                return 'JSON';
            case 'html':
                return 'HTML';
            case 'csharp':
                return 'C#';
            case 'typescript':
                return 'TypeScript';
            case 'css':
                return 'CSS';
            default:
                return;
        }
    }

    const fullSizeHandler = (blockId) => {
        window.scrollTo(0, 0);
        const blockElement = document.getElementById(blockId);
        blockElement.classList.add('full-screen');
    }

    const exitFullScreen = (blockId) => {
        const blockElement = document.getElementById(blockId);
        blockElement.classList.remove('full-screen');
    }

    const renderTags = (filtered) => {
        filtered.tags.map(tagObj => {
            if(tagObj.tag.toLowerCase().includes(search.toLowerCase())){
                return filtered;
            }
        })
    }

    useEffect(() => {
        if(!userInfo)
        {
            navigate('/login');
        }

        dispatch(listCodes(folderid));

    }, [dispatch,seccessCreate, navigate, userInfo, successDelete,folderid]);
   
    let date;
    return (
        <MainScreen title={userInfo && `${userInfo.name}'s CodeBlocks`}>
        <div className="codes-cont">
            <div className="my-codes-top">

                <Link to={`/myfolders/${folderid}/mycodes/create/`}><button className='creat-new-btn'>Create New Code <span>+</span></button></Link>

                <form>
                    <label>
                        <input type="text" 
                            placeholder='Tags Filter'
                            onChange={(e) => setSearch(e.target.value)}
                            />
                        <img src={searchImg} alt="search" />
                    </label>
                </form>

                <div className="return-btn ret-folders" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="back" />
                        <p>All Folders</p>
                </div>
            </div>

            { errorDelete && <ErrorMessage>{ errorDelete }</ErrorMessage>}
            { error && <ErrorMessage>{ error }</ErrorMessage>}
            { loading && <Loading/>}
            { list?.filter(filtered => (
                filtered.tags[0].tag.toLowerCase().includes(search.toLowerCase()) ||
                filtered.tags[1].tag.toLowerCase().includes(search.toLowerCase()) ||
                filtered.tags[2].tag.toLowerCase().includes(search.toLowerCase())
            )).map(codeBlock => (
            <Accordion defaultActiveKey="0" key={codeBlock._id}>
                <Accordion.Item eventKey="1" >
                    <div className="header-card">
                        <Accordion.Header>
                            {codeBlock.title} - <span>{SetLanguageToShow(codeBlock.language)}</span>
                        </Accordion.Header>
                        <div>
                            <Link to={`/myfolders/${folderid}/update/${codeBlock._id}`}><Button  className='edit-btn'>Edit</Button></Link>
                            <Button className='del-btn' 
                            onClick={() => deleteHandler(codeBlock._id)}>Delete</Button>
                        </div>
                    </div>

                    <Accordion.Body>
                        <div className="tag-cont">
                            <p><span>Tags: </span></p> 
                            {codeBlock.tags && codeBlock.tags.map((pos,i) => (
                                <div className="tag"  key={i}>
                                    <div className='tag-badge' key={i} id='tag-name'>{pos.tag}</div>
                                </div>
                            ))}
                        </div>
                        <div className='codeblock-content' id={'block'+codeBlock._id}>
                            <AceEditor
                                className='ace-cont'
                                readOnly
                                mode={codeBlock.language}
                                theme="twilight"
                                name="blah2"
                                fontSize={28}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={codeBlock.code}
                                setOptions={{
                                    showLineNumbers: true,
                                    tabSize: 4,
                                    useWorker: false                                        
                                }}
                            />
                        
                            <div dir='auto' dangerouslySetInnerHTML={{__html: codeBlock.explanation}} className='summary-cont'/>
                            <img className='exit-full' src={normalScreenImg} alt="exit full screen" onClick={()=> exitFullScreen('block'+codeBlock._id)}/>
                        </div>
                        
                        <div className="card-footer">
                            <p>Created on: {date = new Date(Date.parse(codeBlock.createdAt)).toLocaleDateString()}
                            </p>
                            <img src={fullScreenImg} alt="fullscrenn" onClick={() => fullSizeHandler('block'+codeBlock._id)}/>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            ))}
        </div>
        </MainScreen>
    )
}

export default MyCodes
