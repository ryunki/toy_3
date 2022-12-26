import { useState } from 'react';
import Input from '../components/FormElements/Input';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    console.log(e.target[2].value)
  };

  const onSwitchHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const inputHandler = () => {

  }

  return (
    <>
      <form method="get" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
            <Input
              type="text"
              id="username"
              name="username"
              label="User Name"
              errorText="Please enter a user name"
              value={inputHandler}
            />
          
        )}
        <Input type="email"
              id="email"
              name="email"
              label="E-mail"
              errorText="Please enter a valid email"/>
        <Input type="password"
              id="password"
              name="password"
              label="Password"
              errorText="Please enter a valid password, at least 6 characters"/>

        <button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</button>
      </form>
      <button type="submit" onClick={onSwitchHandler}>
        Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>
    </>
  );
};

export default Auth;
