import React from "react";
import { toast } from "react-toastify";
import { useUserData, useSignInAnonymous  } from "@nhost/react";
import './InputBox.css'

export default function InputBox({ msg, setMsg, sendMessage, firstMsg }) {
  const user = useUserData(); 
  const { signInAnonymous, isLoading, error } = useSignInAnonymous();

  const handleSend = async () => {
    if (!msg.trim()) return;

    if (!user) {
        const { session, user: guestUser ,error} = await signInAnonymous();
        if(error){
          console.log(error.message || " Anonumous sign in fail");
          return;
        }  
    }
    sendMessage();
    setMsg("");
  };

  return (
    <div className={`search-div ${firstMsg ? 'center' : ""}`}>
      <i className="fa-solid fa-robot"></i>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Let's chat"
      />
      <button onClick={handleSend} disabled={!msg.trim() || isLoading}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}
