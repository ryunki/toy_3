
import {useState, useReducer, useEffect} from 'react'

import './CSS/formElements.css'

function inputReducer (state, action){
  switch(action.type){
    case "AUTH":
      return{
        ...state,
        value:action.value,
        isValid: validate(action.name, action.value),
        isBlur:false
      }
    case "BLUR":
      return{
        ...state,
        isBlur:true
      }
    default:
      return state
  }
}

const Input = ({type, id, name, label, errorText, onInput}) => {
  const [inputState, dispatch] = useReducer(inputReducer,{
    value: "",
    isValid: false,
    isBlur: false
  })
  const changeHandler = (e) =>{
    dispatch({
      type: "AUTH",
      value: e.target.value,
      name: e.target.name
    })
  }

  const {value, isValid} = inputState

useEffect(()=>{
  onInput(id, value, isValid)
},[value, isValid])

  const blurHandler = () =>{
    dispatch({
      type: "BLUR"
    })
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <br/>
      <input
        type={type}
        id={id}
        name={name}
        // value={input}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      <br/>
      {!inputState.isValid && inputState.isBlur && (
        <>
        <div>{errorText}</div>
        </>
      )}
    </div>
  );
};

export default Input;


function validate(name, value){
  if (name === "username"){
    return value.length > 2 && value.length < 13
  }
  if (name === "email"){
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  }
  if (name === "password"){
    return value.length > 5
  }
}

