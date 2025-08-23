import React from "react";
import ReactMarkdown from "react-markdown";
import './MessageBubble.css'
export default function MessageBubble({ msg, lumalogo }) {
  return (
    <div className="cover-div">
      {msg.sender === "bot" && (
        <div className="img-continer">
          <img src={lumalogo} alt="bot" />
        </div>
      )}
      <div className={msg.sender === "user" ? "user-bubble" : "bot-bubble box"}>
        <ReactMarkdown>{msg.content}</ReactMarkdown>
      </div>
    </div>
  );
}