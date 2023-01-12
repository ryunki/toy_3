import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users:[]
}

export const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnlineUsers: (state, action)=>{

      state.users = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setOnlineUsers } = onlineSlice.actions

export default onlineSlice.reducer