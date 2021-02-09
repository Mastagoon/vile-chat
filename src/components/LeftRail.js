import React from 'react'
import { Loader } from 'semantic-ui-react'
import { useChat } from '../context/ChatContext'
import useResolved from "../hooks/useResolved"
import ChatList from './ChatList'
import RailHeader from './RailHeader'

const LeftRail = () => {

    const { myChats, createChatClick } = useChat()
    const chatResolved = useResolved(myChats)

    return (
        <div className="left-rail">
            <RailHeader />
            {chatResolved ? 
                <>
                    {myChats.length ? 
                    <div className="chat-list-container">
                        <ChatList />
                    </div>
                    :
                    <div className="chat-list-conatiner no-chats-yet">
                        <h3>No chats yet</h3>
                    </div>
                
                    }
                    <button className="create-chat-button" onClick={createChatClick}>
                        Create Chat
                    </button>
                </>
                :
                <div className="chats-loading">
                    <Loader active size="huge" />
                </div>
            }
        </div>
    )
}

export default LeftRail
