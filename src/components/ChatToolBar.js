import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { useChat } from '../context/ChatContext'
import joinUserNames from '../helpers/joinUserNames'
import SearchUsers from './SearchUsers'

const ChatToolBar = () => {
    
    const { chatConfig, selectedChat } = useChat()
    const [searching, setSearching] = useState(false)

    return (
        <>
            <div className="chat-toolbar">
                <div className="chat-header-text">
                    {joinUserNames(selectedChat.people, chatConfig.userName).slice(0,100)}
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
        </>
    )
}

export default ChatToolBar
