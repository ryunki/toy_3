import { configureStore } from '@reduxjs/toolkit'
import onlineReducer from './slices/onlineSlice'
import userReducer from './slices/userSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    online: onlineReducer,
    chat: chatReducer
  },
})