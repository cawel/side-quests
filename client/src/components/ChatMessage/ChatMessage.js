import React, { useState } from "react";
import './ChatMessage.scss';


export default function ChatMessage(props) {

  const avatar = props.userData[0].avatar;

  return (

    props.currentUser ?
      <div className="chatMessage currentUser">
        <div className="speechBubble">{props.message}</div><img className="userImage rounded-circle" src={avatar} />
      </div>
      :
      <div className="chatMessage otherUser">
        <img className="userImage rounded-circle" src={avatar} /><div className="speechBubble">{props.message}</div>
      </div>
  )
}