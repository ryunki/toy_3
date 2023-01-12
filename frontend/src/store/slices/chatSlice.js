import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages:[],
  participants:[]
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action)=>{
      state.messages=action.payload.messages
      state.participants=action.payload.participants
    }
  }
})

// Action creators are generated for each case reducer function
export const { setChat } = chatSlice.actions

export default chatSlice.reducer