import React, { useEffect } from 'react'
import { ChatEngine, getChats } from 'react-chat-engine'
import ChatInput from '../components/ChatInput'
import ChatToolBar from '../components/ChatToolBar'
import LeftRail from '../components/LeftRail'
import MessageList from '../components/MessageList'
import { useChat } from '../context/ChatContext'

const Chat = () => {

    const { myChats, setMyChats, chatConfig, selectedChat, setSelectedChat,selectChatClick } = useChat()

    return (
        <>
            <LeftRail />
            {chatConfig && (
                <ChatEngine
                    hideUI={true}
                    userName={chatConfig.userName}
                    projectID={chatConfig.projectID}
                    userSecret={chatConfig.userSecret}
                    onConnect={() => {
                        getChats(chatConfig, setMyChats)
                    }}
                    onNewChat={(chat) => {
                        if(chat.admin.username === chatConfig.userName) selectChatClick(chat)
                        setMyChats([chat, ...myChats])
                    }}
                    onDeleteChat={(chat) => {
                        if(selectedChat?.id === chat.id) setSelectedChat(null)
                        setMyChats(myChats.filter(c => c.id !== chat.id))
                    }}
                    onNewMessage={(chatId, message) => {
                        if(selectedChat && chatId === selectedChat.id) {
                            setSelectedChat({
                                ...selectedChat,
                                messages: [...selectedChat.messages, message]
                            })
                        }
                        const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId)
                        const filteredChats = myChats.filter(c => c.id !== chatId)
                        const updatedChat = {
                            ...chatThatMessageBelongsTo,
                            last_message: message
                        }
                        setMyChats(
                            [updatedChat, ...filteredChats]
                        )
                    }}
                />
            )}

            <div className="chat-container">
                <div className="current-chat">
                    {selectedChat ? 
                    <div className="chat">
                        <ChatToolBar />
                        <MessageList />
                        <ChatInput />
                    </div>
                    : 
                    <div className="no-chat-selected">
                        <img src="/img/nochats.png" className="point-left" alt="no-chats"/> Select A Chat You Stupid Cunt
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Chat
