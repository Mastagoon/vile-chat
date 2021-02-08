import React from 'react'

const OthersMessage = ( { lastMessage, message } ) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username != message.sender.username
    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div className="message-avatar" style={{backgroundImage: `url(${message?.sender?.avatar})`}} />
            )}
            {message?.attachments?.length > 0 ?
            (
                <div className="message">
                    <img
                        src={message.attachments[0].file}
                        alt="Message Attachment"
                        className="message-image"
                        style={{float: "left", marginLeft: isFirstMessageByUser ? "4px" : "48px"}}
                    /> {message.text}
                </div>
            )
            :
            (
                <div className="message" style={{ float: "left", backgroundColor: "#CABCBC",     marginLeft: isFirstMessageByUser ? "4px" : "48px"}}>
                    {message.text}
                </div>
            )}
        </div>
    )
}

export default OthersMessage
