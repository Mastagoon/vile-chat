import React, { useState } from 'react'
import { sendMessage, isTyping } from "react-chat-engine"

const MessageForm = (props) => {
    const { chatId, creds } = props


    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = value.trim()
        console.log(text)
        if(text.length > 0) sendMessage(creds, chatId, { text })
        setValue("")
    }

    const handleChange = (e) => {
        setValue(e.target.value)
        // isTyping(props, chatId)
    }

    return (
        <form className="message-form" onSubmit={handleSubmit}> 
            <input 
                className="message-input"
                placeholder="Send a message" // insult here
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button"></label>
        </form>
    )
}

export default MessageForm
