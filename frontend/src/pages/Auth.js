import { useState, useEffect, useRef } from 'react';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/form-hook';

import './CSS/auth.css'

const initialInputs = {
  // username:{
  //   value:"",
  //   isValid:false,
  // },
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
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [formState, inputHandler, setFormSwitched] = useForm(initialInputs, initialFormValidity)
  
  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState)
    
    if(isLoginMode){
      
    } else{
    
    }
  };

  const onSwitchHandler = () => {
    console.log("onSwitch: ",formState)
    if(!isLoginMode){  //register mode
      setFormSwitched(
        {...formState.inputs, username:undefined},
        formState.inputs.email.isValid && formState.inputs.password.isValid
        )
    }else{ // login mode
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

  return (
    <div className="auth-container">
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
    </div>
  );
};

export default Auth;
