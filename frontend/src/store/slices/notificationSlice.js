import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  currentChat:"",
  incomingMessages:[]
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: { 
    setNotification: (state, action)=>{
      
        //this two constants comes from socketConnection.js. when received a new message from another user
        const receiverId = action.payload.userId
        const senderId = action.payload.participants?.filter(p=> p !== receiverId)
        
        //the very first message in redux
        if(state.incomingMessages.length === 0 && senderId){
          console.log("first message in notification")
          state.incomingMessages.push({
            // participants: action.payload.participants,
            messageChecked:false,
            conversationId: action.payload.conversationId,
            senderId: senderId[0]
          })
        }else{ // add to redux from the second message
          console.log("CURRENT CHAT: ",state.currentChat)
          console.log("second message in notification")
          let convoExists = false
          for (const i of state.incomingMessages){
            // First, check if convo already exists in redux
            if(i.conversationId === action.payload.conversationId){
              //Second, check if the targeted username has been clicked to read messages
              if(state.currentChat === i.senderId){
                i.messageChecked = true
              }
              convoExists = true
              break
            }
          }
          //add new messages in redux if duplicate convo doesnt exist
          if(!convoExists && senderId){
            console.log("duplicate doesnt exist in notification")
            state.incomingMessages.push({
              // participants: action.payload.participants,
              messageChecked:false,
              conversationId: action.payload.conversationId,
              senderId : senderId[0]
            })
            // for (const i of state.incomingMessages){
            //   //check if convo already exists in redux
            //   if(i.conversationId === action.payload.conversationId){
            //     if(state.currentChat === i.senderId){
            //       i.messageChecked = true
            //     }else{
            //       i.messageChecked = false
            //     }
            //   }
            // }
          }else{
            // a new chat has arrived while previous chat already exists in redux 
            // for(const i of state.incomingMessages){
            //   if(state.currentChat !== i.senderId){
            //     // turn on the new message indicator when a user is focused to another user
            //     i.messageChecked = false
            //   }
            // }
          }
        
      }
    },
    setCurrentChat:(state, action)=>{
      state.currentChat = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setNotification, setCurrentChat } = notificationSlice.actions

export default notificationSlice.reducer