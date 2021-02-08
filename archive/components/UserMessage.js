import React from 'react'

const UserMessage = ( { message } ) => {
    return message?.attachments?.length > 0 ?
    (
        <div className="message">
            <img
                src={message.attachments[0].file}
                alt="Message Attachment"
                className="message-image"
                style={{float: "right"}}
            /> {message.text}
        </div>
    )
    :
    (
        <div className="message" style={{ float: "right", marginRight: "18px", color: "white", backgroundColor: "#3B2A50" }}>
            {message.text}
        </div>
    )
}

export default UserMessage
