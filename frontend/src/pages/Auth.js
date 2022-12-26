
import {useState} from 'react'

const Auth = () => {
  
  const [isLogin, setIsLogin] = useState(false)

  const authSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onSwitchHandler = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
    <form method="get" onSubmit={authSubmitHandler}>
      {!isLogin && (
        <>
          <label htmlFor="username">User name:</label>
          <input type="text" id="username" name="username" />
          <br />
          <br />
        </>
      )}
      <label htmlFor="email">E-mail:</label>
      <input type="email" id="email" name="email" />
      <br />
      <br />
      <label htmlFor="password">password</label>
      <input type="password" id="password" name="password" />
      <br/>
      <button type="submit">Submit</button>
    </form>
      <button type="submit" onClick={onSwitchHandler}>Switch to {isLogin ? "register" : "login"}</button>
    </>
  );
};

export default Auth;
