import React, { useEffect } from 'react'
import { ChatEngine, getChats } from 'react-chat-engine'
import ChatToolBar from '../components/ChatToolBar'
import LeftRail from '../components/LeftRail'
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
                        setMyChats([...myChats, chat].sort((a, b) => a.id - b.id))
                        console.log("chat added.")
                    }}
                    onDeleteChat={(chat) => {
                        if(selectedChat?.id === chat.id) setSelectedChat(null)
                        setMyChats(myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id))
                        console.log("chat deleted.")
                    }}
                />
            )}

            <div className="chat-container">
                <div className="current-chat">
                    {selectedChat ? 
                    <div className="chat">
                        <ChatToolBar />
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
