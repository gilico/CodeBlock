import './newCodestyle.css'
import '../../components/Header/Header.css'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Card} from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import {useNavigate} from 'react-router';
import { useParams } from 'react-router-dom';
import {createCodeAction} from '../../actions/codesAction';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-jsx";
import ReactQuill from '../../components/TextEditorComponent/editor';
import arrow from '../../images/arrow.png';
import ErrorMessage from '../../components/ErrorMessage';


const languages = [
  "javascript",
  "csharp",
  "java",
  "python",
  "c_cpp",
  "xml",
  "ruby",
  "sass",
  "mysql",
  "json",
  "html",
  "typescript",
  "css"
];

const pretyLanguages = [
    "JavaScript",
    "C#",
    "Java",
    "Python",
    "C/C++",
    "XML",
    "Ruby",
    "SASS",
    "mySQL",
    "JSON",
    "HTML",
    "TypeScript",
    "CSS"
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

const CreateCode = () => {
    const { id } = useParams()    
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

    const codeCreate = useSelector(state => state.codeCreate);
    const { loading, error, code } = codeCreate;

    const sumbitHandler = (e) => {
        e.preventDefault();
        const tags= [{tag: tag1}, {tag:tag2}, {tag:tag3}];
        if(!title || !language || !codeContent || !summary) return;
        
        dispatch(createCodeAction(id, title, language,tags, codeContent, summary));
        resetHandler();
        navigate(-1);
    }

    const languageHandler = (userLang) => {
        const languages = ["javascript", "java", "python", "c_cpp", "xml", "ruby", "sass", "mysql", "json", "html","csharp","typescript", "css"];

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
        <MainScreen title="Create a Code">
            { error && <ErrorMessage>{ error }</ErrorMessage>}
            <div className='new-code-page'>
            <Card>
                <Card.Header>
                    <p><span>Create a new Code With Your Own Explanation</span></p>
                    <div className="return-btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="back" />
                        <p>All Codes</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <form className='new-code-form' onSubmit={sumbitHandler}>
                        <div className='code-exp-cont'>
                            <div className="choose-section">
                                <div className='formgroup sel'>
                                    <label htmlFor="language"><span>Choose Language</span></label>
                                    <select name="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        required
                                    >   
                                        <option>Select</option>
                                        {pretyLanguages.map((lang, i) => (
                                            <option key={lang} value={languages[i]}>
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
                                    required
                                />
                            </div>
                        </div>

                        <div className='code-exp-cont'>
                            <div className='formgroup'>
                                <label><span>Code</span></label>
                                <AceEditor
                                    required
                                    style={{
                                        height: '90%',
                                        width: '90%',
                                        
                                    }}
                                    placeholder="Paste Your Code..."
                                    mode={language}
                                    theme={theme}
                                    name="blah2"
                                    onChange={newCode => setCodeContent(newCode)}
                                    fontSize={28}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={codeContent}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 4,
                                        useWorker: false
                                    }}
                                />
                            </div>
                            
                            <div className='formgroup'>
                                <label><span>Your Explanation</span></label>
                                <ReactQuill
                                    setSummary={setSummary}
                                    summary={summary}
                                    required
                                />
                                
                            </div>
                        </div>
                        <div className="form-footer">
                            <div className="btns-cont">
                                <button type="submit" className='sumt-btn'>SAVE CODE</button>
                                <button type="reset" className='del-btn' onClick={resetHandler}>RESET ALL</button>
                            </div>
                            <div className="tags-ont">
                                <label htmlFor=""><span>Tags</span></label>
                                <div className="tags-inputs">
                                    <input type="text" name="tag1" placeholder="like 'math'"
                                        value={tag1}
                                        onChange={e => setTag1(e.target.value)}
                                        autoComplete='true'
                                    />
                                    <input type="text" name="tag2" placeholder="like 'loops'"
                                        value={tag2}
                                        onChange={e => setTag2(e.target.value)}
                                        autoComplete='true'
                                        />
                                    <input type="text" name="tag3" placeholder="like 'logic'"
                                        value={tag3}
                                        onChange={e => setTag3(e.target.value)}
                                        autoComplete='true'
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </Card.Body>
                <Card.Footer>
                    <p>Creating on - {new Date().toLocaleDateString("en-US", setDayOptions)}</p> 
                </Card.Footer>
            </Card>
            </div>
        </MainScreen>
    )
}

export default CreateCode;
