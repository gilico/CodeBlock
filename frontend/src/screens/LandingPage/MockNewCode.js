import {useState } from 'react';
import {Card} from 'react-bootstrap';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-jsx";
import ReactQuill from '../../components/TextEditorComponent/editor';
import arrow from '../../images/arrow.png';
import '../CreateCode/newCodestyle.css';

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

function MockNewCode() {
    const [language, setLanguage] = useState("");
    const [theme, setTheme] = useState("");
    const [summary , setSummary ] = useState("");

    return (
        <div className="try-it-yourself">
            <Card>
                <Card.Header>
                    <p><span>Create a new Code With Your Own Explanation</span></p>
                    <div className="return-btn">
                        <img src={arrow} alt="back" />
                        <p>All Codes</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <form className='new-code-form'>
                        <div className='code-exp-cont'>
                        <div className="choose-section">
                                <div className='formgroup sel'>
                                    <label htmlFor="language"><span>Choose Language</span></label>
                                    <select name="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
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
                                <input type="text" name='title'/>
                            </div>
                        </div>

                        <div className='code-exp-cont'>
                            <div className='formgroup'>
                                <label><span>Code</span></label>
                                <AceEditor
                                    style={{
                                        height: '90%',
                                        width: '90%',
                                        
                                    }}
                                    placeholder="Paste Your Code..."
                                    mode={language}
                                    theme={theme}
                                    name="blah2"
                                    fontSize={28}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
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
                                />
                                
                            </div>
                        </div>
                        <div className="form-footer">
                            <div className="btns-cont">
                                <button disabled={true} type="submit" className='sumt-btn'>SAVE CODE</button>
                                <button type="reset" className='del-btn' >RESET ALL</button>
                            </div>
                            <div className="tags-ont">
                                <label htmlFor=""><span>Tags</span></label>
                                <div className="tags-inputs">
                                    <input type="text" name="tag1" placeholder="like 'math'"/>
                                    <input type="text" name="tag2" placeholder="like 'loops'"/>
                                    <input type="text" name="tag3" placeholder="like 'logic'"/>
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
    )
}

export default MockNewCode
