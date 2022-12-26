import {useState} from 'react'

const Input = (props) => {
  const [input, setInput] = useState("")

  const changeHandler = (e) => {
    setInput(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={input}
        onChange={changeHandler}
      />
      <br />
    </>
  );
};

export default Input;
