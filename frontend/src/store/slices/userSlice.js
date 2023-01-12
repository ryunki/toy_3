import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  token:"",
  username:"",
  _id:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action)=>{
      state.email=action.payload.email
      state.token=action.payload.token
      state.username=action.payload.username
      state._id=action.payload._id
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer