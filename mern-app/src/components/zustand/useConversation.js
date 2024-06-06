import { create } from 'zustand'
const useConversation =create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
    isInputActive: false, // New state variable
    setInputActive: (isActive) => set({ isInputActive: isActive }),

}))
export default useConversation;