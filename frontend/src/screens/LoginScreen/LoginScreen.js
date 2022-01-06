import React,{useEffect, useState} from 'react'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../../actions/userActions';
import {useNavigate} from 'react-router';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo)
        {
            navigate('/myfolders');
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        
        e.preventDefault();

        dispatch(login(email, password));
    }


    return (
        <div className="form-sign-log log">
            
           <form className="login" onSubmit={submitHandler}>
                <h2>Login</h2>
                { error && <ErrorMessage> {error} </ErrorMessage> }
                <div className="input-cont">
                    <div className='log-part'>
                        <label>Email</label>
                        <input type="text" name="email" required autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="email error"></div>
                    </div>

                    <div className='log-part'>
                        <label>Password</label>
                        <input type="password" name="password" required autoComplete='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    { loading && <Loading />}
                    <button>login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen
