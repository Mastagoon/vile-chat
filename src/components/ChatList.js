import React from 'react'
import { Icon } from 'semantic-ui-react'
import { useChat } from '../context/ChatContext'
import joinUserNames from '../helpers/joinUserNames'
import notMe from '../helpers/notMe'
import ChatAvatar from './ChatAvatar'

const ChatList = () => {

    const { myChats, chatConfig, selectedChat, selectChatClick, deleteChatClick } = useChat()

    return (
        <div className="chat-list">
            {myChats.map((chat, index) => (
                <div className={`chat-list-item ${selectedChat?.id === chat.id ? 'selected-chat-item' : ''}`} key={index}>
                    <div className="chat-list-item-content" onClick={() => selectChatClick(chat)}>
                        {chat.people.length == 1 ? (
                            <>
                                <Icon circular inverted color="violet" name="user cancel" />
                                <div className="chat-list-preview">
                                    <div className="preview-username">No one added yet</div>
                                </div>
                            </>
                        )
                        : 
                        chat.people.length == 2 ? (
                            <>
                                <ChatAvatar chat={chat} username={notMe(chatConfig, chat)} />
                                <div className="chat-list-preview">
                                    <div className="preview-username">{notMe(chatConfig, chat)}</div>
                                    <div className="preview-message">
                                        {chat.last_message.text ? chat.last_message.attachments?.length ? `${chat.last_message.sender.username} sent an attachment` : chat.last_message.sender.username === chatConfig.userName ? `You: ${chat.last_message.text.slice(0,50)}...` : `${chat.last_message.text.slice(0,50)}...` : "New Chat!"}
                                    </div>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <Icon circular inverted color="brown" name="users" />
                                <div className="chat-list-preview">
                                    <div className="preview-username">{chat.title ? chat.title : joinUserNames(chat.people, chatConfig.userName).slice(0,50)+"..."}</div>
                                    <div className="preview-message">
                                        {chat.last_message.text ? chat.last_message.attachments?.length ? `${chat.last_message.sender.username} sent an attachment` : chat.last_message.sender.username === chatConfig.userName ? `You: ${chat.last_message.text.slice(0,50)}...` : `${chat.last_message.sender.username}: ${chat.last_message.text.slice(0,50)}...` : "New Chat!"}
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </div>
                    <div onClick={() => deleteChatClick(chat)} className="chat-item-delete">
                        <Icon name="delete" />
                    </div>
                </div>
    ))}
        </div>
    )
}

export default ChatList
