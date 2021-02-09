import React, { useState } from 'react'
import { editChat, sendMessage } from 'react-chat-engine'
import { Icon, Modal } from 'semantic-ui-react'
import { useChat } from '../context/ChatContext'
import joinUserNames from '../helpers/joinUserNames'
import SearchUsers from './SearchUsers'
import getInsult from "insults"

const ChatToolBar = () => {
    
    const { chatConfig, selectedChat, myChats, setMyChats, setSelectedChat } = useChat()
    const [searching, setSearching] = useState(false)
    const [chatName, setChatName] = useState(selectedChat.title)
    const [editChatNameModalOpen, setEditChatNameModalOpen] = useState(false)

    const changeChatName = () => {
        setEditChatNameModalOpen(false)
        editChat(chatConfig, selectedChat.id, { title: chatName }, () => {
            const filteredChats = myChats.filter(c => c.id !== selectedChat.id)
            const updatedChat = {
                ...selectedChat,
                title: chatName
            }
            setSelectedChat(updatedChat)
            setMyChats([updatedChat, ...filteredChats])
            sendMessage(chatConfig, selectedChat.id, { text: `${chatConfig.userName} Has changed the group name.` })
        })
    }

    return (
        <>
            <div className="chat-toolbar">
                <div className="chat-header-text">
                    {selectedChat.title ? selectedChat.title : joinUserNames(selectedChat.people, chatConfig.userName).slice(0,100)}
                    <Icon name="edit" className="edit-chat-icon" onClick={() => setEditChatNameModalOpen(true)}/>
                </div>
                <div className="add-user-icon">
                    <Icon
                        color="grey"
                        name="user plus"
                        onClick={() => setSearching(true)}
                    />
                </div>
            </div>

            <SearchUsers visible={searching} closeFn={() => setSearching(false)}/>

        {editChatNameModalOpen &&
            <Modal dimmer="blurring" open={true}>
                <Modal.Header>Change Chat Name</Modal.Header>
                <Modal.Content>
                    <p className="text-center text-white">{getInsult()}</p>
                    <input type="text" className="chat-name-input" value={chatName} onChange={(e) => setChatName(e.target.value)} onKeyPress={(e) => {
                        if(e.key === "Enter") changeChatName()
                    }} />
                </Modal.Content>
                <Modal.Actions>
                    <div className="image-upload-actions">
                    <button className="cancel" onClick={() => setEditChatNameModalOpen(false)}>Cancel</button>
                    <button className="submit" onClick={() => {
                        changeChatName()
                    }}>Update</button>
                    </div>
                </Modal.Actions>
            </Modal>
    }
        </>
    )
}

export default ChatToolBar
