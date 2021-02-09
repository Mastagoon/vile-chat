import { createContext, useContext, useEffect, useState } from "react"
import { fb } from "../firebase"
import { deleteChat, getMessages, leaveChat, newChat } from "react-chat-engine"

export const ChatContext = createContext()

export const ChatProvider = ({ children, authUser }) => {

    const [myChats, setMyChats] = useState()
    const [chatConfig, setChatConfig] = useState()
    const [selectedChat, setSelectedChat] = useState()

    const createChatClick = () => {
        newChat(chatConfig, { title: '' })
    }

    const deleteChatClick = (chat) => {
        const isAdmin = chat.admin === chatConfig.userName
        if(isAdmin && window.confirm(`Are you sure you want to delete this chat?`)) {
            deleteChat(chatConfig, chat.id)
        } else if(window.confirm(`Are you sure you want to leave this chat?`)) {
            leaveChat(chatConfig, chat.id, chatConfig.userName)
        }
    }

    const selectChatClick = (chat) => {
        getMessages(chatConfig, chat.id, messages => {
            setSelectedChat({
                ...chat,
                messages
            })
        })
    }

    useEffect(() => {
        if(authUser) {
            fb.firestore.collection(`chatUsers`).doc(authUser.uid).onSnapshot(snap => {
                setChatConfig({
                    userSecret: authUser.uid,
                    avatar: snap.data().avatar,
                    userName: snap.data().displayName,
                    projectID: "ff448d9d-cec9-4402-9e11-042257ec10b6"
                })
            })
        }
    }, [authUser])



    return (
        
        <ChatContext.Provider
            value={{
                myChats,
                setMyChats,
                chatConfig,
                setChatConfig,
                selectedChat,
                setSelectedChat,
                selectChatClick,
                deleteChatClick,
                createChatClick
            }}    
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    const {
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick
    } = useContext(ChatContext)
    return {
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick
    }
}