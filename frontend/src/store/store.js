import { configureStore } from '@reduxjs/toolkit'
import onlineReducer from './slices/onlineSlice'
import userReducer from './slices/userSlice'
import chatReducer from './slices/chatSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    online: onlineReducer,
    chat: chatReducer,
    //****************************** */
    // notification: notificationReducer
  },
})