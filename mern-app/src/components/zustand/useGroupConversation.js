import { create } from 'zustand';

const useGroupConversation = create((set) => ({
    selectedGroupConversation: null,
    setSelectedGroupConversation: (selectedGroupConversation) =>
        set({ selectedGroupConversation }),
    GroupMessages: [], // Initialize as an empty array
    setGroupMessages: (GroupMessages) => set({ GroupMessages }),
}));

export default useGroupConversation;





























