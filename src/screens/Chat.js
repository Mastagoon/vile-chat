import React, { useEffect } from 'react'
import { ChatEngine, getChats } from 'react-chat-engine'
import LeftRail from '../components/LeftRail'
import { useChat } from '../context/ChatContext'

const Chat = () => {

    const { myChats, setMyChats, chatConfig, selectedChat } = useChat()

    return (
        <>
            <LeftRail />
            {chatConfig && (
                <ChatEngine
                    hideUI={true}
                    userName={chatConfig.userName}
                    projectId={chatConfig.projectId}
                    userSecret={chatConfig.userSecret}
                    onConnect={() => {
                        getChats(chatConfig, setMyChats)
                    }}
                />
            )}

            <div className="chat-container">
                <div className="current-chat">
                    {selectedChat ? <></> 
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
