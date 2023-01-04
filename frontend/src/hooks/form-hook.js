import { useCallback, useReducer } from "react"

function formReducer(state, action){
// const formReducer=(state, action)=>{
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const id in state.inputs){
        // if (!state.inputs[id]){ 
        //   continue;
        // }
        if (id === action.id){ 
          //update the validity of changed input to form validity
          formIsValid = formIsValid && action.isValid
        } else {
          //update the validity of existing inputs
          formIsValid = formIsValid && state.inputs[id].isValid
        }
      }
      return {
          ...state, 
          inputs: {
            ...state.inputs,
            [action.id]: { value: action.value, isValid: action.isValid },
          },
          isValid: formIsValid
        }
      
    case "SWITCH":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
    default:
      return state
  }
}

export const useForm = (initialInputs, initialFormValidity) => {

  const [formState, dispatch] = useReducer(
    formReducer,
    {
      inputs: initialInputs,
      isValid: initialFormValidity
    }
  )

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type:"INPUT_CHANGE",
      id,
      value,
      isValid,
    })
  },[])

  const setFormSwitched = useCallback((input, formValidity) =>{
    dispatch({
      type:"SWITCH",
      inputs: input,
      formIsValid: formValidity
    })
  },[])
  return [formState, inputHandler, setFormSwitched]
}

