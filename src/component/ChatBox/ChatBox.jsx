import lumalogo from "../../assets/circleluma.png";
import MessageBubble from "../MessageBubble/MessageBubble";
import { useState } from "react";
import './ChatBox.css'
export default function ChatBox({ msgs, endRef }) {
  const [show, setShow] = useState(false);
  return (
    <div className="console">
        { show ? <div className="login-form">
          <div className="cross" onClick={()=>navigate('/')}>X</div>
             <form >
                <h3>Chat Title</h3>
                  <input
                      type="text"
                      placeholder="Title"
                      // onChange={(e) => setName(e.target.value)}
                      value={name}
                  />
                  <button type="submit">create</button> 
                </form>  
        </div>:""}
      {msgs.map((m) => (
        <MessageBubble key={m.id} msg={m} lumalogo={lumalogo} />
      ))}
      <div ref={endRef}></div>
    </div>
  );
}


