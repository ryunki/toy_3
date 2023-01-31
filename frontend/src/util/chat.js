// import { useSelector } from "react-redux";
import {setChat} from "../store/slices/chatSlice";

export const updateDirectChatHistoryIfActive = (data, dispatch, chat, userId) =>{

  // const chat = useSelector(state => state.chat)
  // const userId = useSelector(state => state.user._id)
  const receiverId = chat.participants.filter(p => p !== userId)
  
  if(receiverId[0] && userId){
    console.log(userId,receiverId[0])
    const usersInConversation = [receiverId[0], userId]
    const result = data.participants.every(p =>{
      return usersInConversation.includes(p)
    })
    
    if (result){
      dispatch(setChat(data))
    }
  }
}