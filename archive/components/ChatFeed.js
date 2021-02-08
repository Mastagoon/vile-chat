import React from 'react'

import MessageForm from "./MessageForm"
import UserMessage from "./UserMessage"
import OthersMessage from "./OthersMessage"

const ChatFeed = (props) => {

    const { chats, activeChat, userName, messages } = props
    
    const chat = chats && chats[activeChat]

    const renderMessages = () => {
        const keys = Object.keys(messages)
        return keys.map((key,index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const isMyMessage = userName === message.sender.username
            return (
                <div key={`mes_${index}`} style={{width: "100%"}}>
                    <div className="message-block">
                        {
                            isMyMessage ? 
                            <UserMessage message={message} /> 
                            :
                            <OthersMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-recipts" style={{float: isMyMessage ? "right": "left", marginRight: isMyMessage ? "18px": "0px", marginLeft: isMyMessage ? "0px" : "68px"}}>
                        Read.
                    </div>
                </div>
            )
        })
    }

    return chat ? (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((user) => ` ${user.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{height: "570px"}} />
            <div className="message-form">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    ) : "Loading...."
}

export default ChatFeed
