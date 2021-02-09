import React from 'react'
import { useChat } from '../context/ChatContext'
import { groupMessages } from '../helpers/groupMessages'
import { useScrollToBottom } from '../hooks/useScrollToBottom'
import ChatAvatar from './ChatAvatar'

const MessageList = () => {

    const { chatConfig, selectedChat } = useChat()

    useScrollToBottom(selectedChat, 'chat-messages')

    return (
        <div className="chat-messages">
            {selectedChat.messages.length ? (
                groupMessages(selectedChat.messages).map((message, index) => (
                    <div key={index} className={`${message[0].sender.username === chatConfig.userName ? 'self-chat-messages': 'chat-message'}`}>
                        {message[0].sender.username !== chatConfig.userName && <div className="chat-message-header">
                            <ChatAvatar className="message-avatar" username={message[0].sender.username} chat={selectedChat} />
                            <div className="message-author">{message[0].sender.username}</div>
                        </div>}
                        <div className="message-content">
                            {message.map((individualMessage, index) => (
                                <div key={index}>
                                    <div className="message-text">{individualMessage.text}</div>    
                                    {individualMessage.attachments.length ? (<img className="message-image" src={individualMessage.attachments[0].file} alt={individualMessage.id+"attachment"} />) : ""}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )
            :
            (
                <div className="no-messages-yet">Say hello in this chat!</div>
            )
        }
        </div>
    )
}

export default MessageList
