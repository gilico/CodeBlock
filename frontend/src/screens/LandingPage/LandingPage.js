import {useState } from 'react'
import Button from '@restart/ui/esm/Button'
import {Link} from 'react-router-dom'
import './LandingPage.css';
import MockNewCode from "./MockNewCode";
import myFoldersImg from "../../images/myfolders.png";
import myCodesImg from "../../images/mycodes.png";
import codeBlockImg from "../../images/codeblock.png";

const LandingPage = () => {
     
    return (
        <div className="container new-code-page">
            <div id="main">
                <div className="intro">
                    <h1 id="title" className="main-title">CODE<span>BLOCK</span>()</h1>
                    <h2>Have A <span>NoteBook</span> For Your Learning <span>Code</span></h2>
                    <div className="button-cont">
                        <Link to="/login"><Button className="log">Login</Button></Link>
                        <Link to="/signup"><Button className="sign">Sign Up</Button></Link>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='examples'>
                <div className='mock examples-child'>
                    <h3 style={{textAlign:'center'}}>Create a CodeBlock</h3>
                    <MockNewCode/>
                </div>
                <div className='line'></div>
                <div className="folders-img-cont examples-child">
                    <h3 style={{textAlign:'center'}}>Organize Your CodeBlocks In Folders</h3>
                    <img src={myFoldersImg} alt="myfolders" />
                </div>
                <div className='line'></div>
                <div className="codes-img-cont examples-child">
                    <h3 style={{textAlign:'center'}}>Display Your Code By it's Folder</h3>
                    <img src={myCodesImg} alt="mycodes" />
                </div>
                <div className='line'></div>
                <div className="codes-img-cont codeblock-ex examples-child">
                    <h3 style={{textAlign:'center'}}>Return To Your Code and Your Explanation</h3>
                    <img src={codeBlockImg} alt="mycodes" />
                </div>
            </div>
        </div>   
    )
}



export default LandingPage
