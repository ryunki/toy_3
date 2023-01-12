import { configureStore } from '@reduxjs/toolkit'
import onlineReducer from './slices/onlineSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    online: onlineReducer
  },
})