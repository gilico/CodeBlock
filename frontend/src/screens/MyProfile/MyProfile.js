import './profileStyle.css'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import MainScreen from '../../components/MainScreen';
import { useDispatch,  useSelector } from 'react-redux';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import {CategoryScale} from 'chart.js';
import {codesStatsAction} from '../../actions/codesAction';
import Loading from '../../components/Loading';

 Chart.register(CategoryScale)

const MyProfilde = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;


    const codeStatsRed = useSelector(state => state.codeStatsRed)
    const { loading, codeStats, error} = codeStatsRed;




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

    useEffect(() => {
        if(!userInfo){
            navigate('./login');
        }

        dispatch(codesStatsAction());

    }, [dispatch, navigate, userInfo])
    

    return (
        <MainScreen title={userInfo && `${userInfo.name}'s Profile`}>
            { loading && <Loading />}
            {/* { error && <ErrorMessage> { error }</ErrorMessage>} */}
            <div className='graph'>
                
            </div>
        </MainScreen>
    )
}

export default MyProfilde
