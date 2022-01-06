import '../../components/Header/Header.css';
import './newCodestyle.css';
import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card} from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import {useNavigate, useParams} from 'react-router';
import {codeUpdateReducer} from '../../reducers/codeBlockReducer';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import {updateCodeAction} from '../../actions/codesAction';
import ReactQuill from '../../components/TextEditorComponent/editor';
import arrow from '../../images/arrow.png';

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
const setDayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const SingleCode = () => {

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [codeContent, setCodeContent] = useState("");
    const [summary , setSummary ] = useState("");
    const [theme, setTheme] = useState("")
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const codeUpdate = useSelector(state => state.codeUpdate);
    const { loading, error } = codeUpdate;

    
    const { id } = useParams();
    const { codeid } = useParams();       

    useEffect(() => {
        
        const fetching = async () => {
            const { data } = await axios.get(`/api/myfolders/${id}/mycodes/${codeid}`);
            console.log(data);
            setTitle(data.title);
            setCodeContent(data.code);
            setLanguage(data.language);
            setSummary(data.explanation);
            setTag1(data.tags[0].tag);
            setTag2(data.tags[1].tag);
            setTag3(data.tags[2].tag);
        }

        fetching();
    }, [id, codeid])
   
    const updateHandler = (e) => {
        e.preventDefault();
        const tags= [{tag: tag1}, {tag:tag2}, {tag:tag3}];
        if(!title || !language || !codeContent || !summary) return;
        
        dispatch(updateCodeAction( id,codeid, title, language,tags, codeContent, summary));
        resetHandler();
        navigate(-1);
    }

    const resetHandler = () => {
        setTitle("");
        setLanguage("");
        setCodeContent("");
        setSummary("");
        setTheme("");
        setTag1("");
        setTag2("");
        setTag3("");
        
    }

    


    
    return (
        <MainScreen title="Update Code">
            <div className='new-code-page'>

            <Card>
                <Card.Header>
                    <p>Edit Your Code Block</p>
                    <div className="return-btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="back" />
                        <p>All Codes</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    { error && <ErrorMessage> { error } </ErrorMessage>}
                    { loading && <Loading />}
                    <form className='new-code-form' onSubmit={updateHandler}>
                        <div className='code-exp-cont'>
                            <div className="choose-section">
                                   <div className='formgroup sel'>
                                    <label htmlFor="language"><span>Choose Language</span></label>
                                    <select name="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        >   
                                        <option><span>Select</span></option>
                                        {languages.map(lang => (
                                            <option key={lang} value={lang}>
                                            {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='formgroup sel'>
                                    <label htmlFor="theme"><span>Choose Theme</span></label>
                                    <select name="theme"
                                        value={theme}
                                        onChange={(e) => setTheme(e.target.value)}
                                        >   
                                        <option>Select</option>
                                        {themes.map(chooseTheme => (
                                            <option key={chooseTheme} value={chooseTheme}>
                                            {chooseTheme}
                                            </option>
                                        ))}
                                    </select>
                                </div> 
                            </div>

                            <div className='formgroup title-cont'>
                                <label htmlFor="title"><span>Title</span></label>
                                <input type="text" name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    
                                    />
                            </div>
                        </div>

                        <div className='code-exp-cont'>
                            <div className='formgroup'>
                                <label><span>Code</span></label>
                                <AceEditor
                                    value={codeContent}
                                
                                    placeholder="Paste Your Code..."
                                    mode={language}
                                    theme={theme}
                                    name="ace-update"
                                    onChange={newCode => setCodeContent(newCode)}
                                    fontSize={28}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }}
                                />  
                            </div>
                            
                            <div className='formgroup'>
                                <label><span>Your Explanation</span></label>
                                <ReactQuill
                                    setSummary={setSummary}
                                    summary={summary}
                                />
                            </div>
                        </div>
                        <div className="form-footer">
                            <div className="btns-cont">
                                <button type="submit" className='sumt-btn'>UPDATE</button>
                                <button type="reset" className='del-btn' onClick={resetHandler}>RESET ALL</button>
                                { loading && <Loading size='50px'></Loading>}
                            </div>
                            <div className="tags-ont">
                                <label htmlFor=""><span>Tags</span></label>
                                <div className="tags-inputs">
                                    <input type="text" name="tag1" placeholder="like 'math'"
                                        value={tag1}
                                        onChange={e => setTag1(e.target.value)}
                                        />
                                    <input type="text" name="tag2" placeholder="like 'loops'"
                                        value={tag2}
                                        onChange={e => setTag2(e.target.value)}
                                        />
                                    <input type="text" name="tag3" placeholder="like 'logic'"
                                        value={tag3}
                                        onChange={e => setTag3(e.target.value)}
                                        />
                                </div>
                            </div>
                        </div>

                    </form>
                </Card.Body>
                <Card.Footer>
                    <p>Updating on - {new Date().toLocaleDateString("en-US", setDayOptions)}</p> 
                </Card.Footer>
            </Card>
            </div>
        </MainScreen>
    )
}

export default SingleCode;
