

import "../../statics/Login.css"
import {useRef,useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentAccessToken, setCredentials ,refreshCredential} from "./authSlice";
import {useLoginMutation} from "./authApiSplice";

const Login = ()=>{
    const userRef = useRef();
    const errRef = useRef(); 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errMsg,setErrMsg] = useState("");
    const navigate = useNavigate();
    const [login,{isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    dispatch(refreshCredential); // refreshes the login credentials on every reload

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrMsg('')
    },[email,password]);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const userData = await login({email,password}).unwrap();
            dispatch(setCredentials({...userData}));
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        }
        catch(err){
             if(!err?.status){
                setErrMsg('No server Response');
             }
             else if(err?.status === 400){
                setErrMsg('Missing email or password');
             }
             else if(err?.status === 401){
                setErrMsg('invalid email or password');
             }
             else if(err?.status === 500){
                setErrMsg('invalid email or password');
             }
             else{
                setErrMsg('Login Failed');
             }
             errRef.current.focus();
        }
    }


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-lg-8 col-sm-12 side-image"></div>
                <div className="col-md-4 col-lg-4 col-sm-12">
                    <div className="login-form-container">
                        <div className="welcome-message-container">
                            <h3 className="login-welcome-message">WELCOME TO Personnel Management</h3>
                            <h3 className="login-sub-welcome-message">Signin to your dashboard</h3>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>email</label>
                                <input 
                                  type="text"
                                  id="email"
                                  ref={userRef} 
                                  onChange={(e)=>setEmail(e.target.value)} 
                                  className="form-control" 
                                  required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                  type="password" 
                                  onChange={(e)=>setPassword(e.target.value)} 
                                  className="form-control" 
                                  required
                                  />
                            </div>
                            <div className="form-group">
                               <button className='btn btn-primary btn-lg login-button'>Login</button>
                            </div>
                        </form>
                        {
                            errMsg != "" 
                            ? <div ref={errRef} className='alert alert-danger'>{errMsg}</div> 
                            : <div ref={errRef}></div>
                        }
                        <div className="other-links">
                            <a href="forgotten">Forgot password?</a><br/>
                            <a href="forgotten">Signup</a><br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;