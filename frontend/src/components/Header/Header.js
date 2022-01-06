import './Header.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';


const Header = () => {

    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = async () => {
        dispatch(logout());
        navigate('/')
        await axios.get("/api/users/logout");
    }
    

    useEffect(() => {}, [userInfo]);

    return (
        <nav>
            <h1 id="title"><a href="/">Code<span>Block</span>()</a></h1>
            <ul>
                {userInfo && <li key='l1'><Link to="/myfolders">My Folders</Link></li>}
                {userInfo && <li key='13'><Link to='myprofile'>Hello, {userInfo.name}</Link></li>}
                {userInfo && <li key='l2'><Link to='/' onClick={logoutHandler}>Log out</Link></li>}
                {!userInfo && <li key='l4'><Link to="/login">Log in</Link></li>}
                {!userInfo && <li key='l5'><Link to="/signup">Sign up</Link></li>}
            </ul>
        </nav>
    );
}

export default Header;