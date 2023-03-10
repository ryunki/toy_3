import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { setUserData } from "../store/slices/userSlice"

import { useForm } from '../hooks/form-hook';

import {userLogin} from '../util/auth';
import {login, register} from '../util/api'

import Input from '../components/FormElements/Input';

import './CSS/auth.css'

const initialInputs = {
  email: {
    value: "",
    isValid: false,
  },
  password: {
    value: "",
    isValid: false,
  }
}
const initialFormValidity = false

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loading, setLoading] = useState(false)
  
  const [formState, inputHandler, setFormSwitched] = useForm(initialInputs, initialFormValidity)
  

  const authSubmitHandler = async(e) => {
    e.preventDefault();
    if(isLoginMode){
      const user = {
        email : formState.inputs.email.value,
        password : formState.inputs.password.value
      }

      setLoading(true)
      // const response = await login(user, navigate)
      login(user, navigate)
        .then(response=>{
            setLoading(false)
            userLogin(response, navigate)
            //saving user data in redux
            dispatch(setUserData(response))
        })

    } else{
      const user = {
        email : formState.inputs.email.value,
        password : formState.inputs.password.value,
        username : formState.inputs.username.value,
      }
      setLoading(true)
      register(user)
        .then(response=>{
            setLoading(false)
            userLogin(response, navigate)
            //saving user data in redux
            dispatch(setUserData(response))
        })
    }
  };

  const onSwitchHandler = () => {
    if(!isLoginMode){  // switching from register to login.
      setFormSwitched(
        {...formState.inputs, username:undefined},
        formState.inputs.email.isValid && formState.inputs.password.isValid
        )
    }else{ // switching from login to register
      setFormSwitched(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    // console.log(formState)
    setIsLoginMode((prevMode) => !prevMode);
  };

  // if user hasn't logged out. let user continue from mainboard
  useEffect(()=>{
    const loggedInUser = localStorage.getItem('user')
    if(loggedInUser){
      navigate('/mainboard')
    }
  },[])

  return (
    <div className="auth-container">
      {loading ?
      <h3>loading....</h3>
       : 
      <div className="auth-wrapper">
        <form method="get" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              type="text"
              id="username"
              name="username"
              label="User Name"
              errorText="Please enter a user name between 3-12 characters"
              onInput={inputHandler}
            />
          )}
          <Input
            type="email"
            id="email"
            name="email"
            label="E-mail"
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            errorText="Please enter a valid password, at least 6 characters"
            onInput={inputHandler}
          />

          <button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</button>
        </form>
        <button type="submit" onClick={onSwitchHandler}>
          Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button>
      </div>

      }
    </div>
  );
};

export default Auth;
