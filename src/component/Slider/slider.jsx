import React, { useState, useEffect } from 'react';
import { useUserEmail } from '@nhost/react';
import nhost from '../../Nhost/nhostClient';
import { MyChats, GetMessages } from '../../../public/mutations'; 
import { toast } from "react-toastify";
import './slider.css';

export default function Slider({ setTitle, sendMessage, createChat, titles, setTitles, title, setchatData, setChatId }) {
  const [isopen, setIsOpen] = useState(false);
  const user = useUserEmail();

  // जब user किसी chat पर click करे
  const showChats = async (id) => {
    const { data: chats, error } = await nhost.graphql.request(GetMessages, { chatId: id });
    if (error) {
      console.log(error);
    } else {
      setchatData(chats);
      setChatId(id); // ✅ अब selected chatId भी set कर रहे हैं
    }
  };

  useEffect(() => {
    const getChats = async () => {
      if (!user) return;

      const { data, error } = await nhost.graphql.request(MyChats);
      if (error) {
        console.error(error);
        return;
      }
      setTitles(data?.chats || []);
    };

    getChats();
  }, [user]);

  const handleTitle = () => {
    if (!title.trim()) return;
    if (!user) {
      toast.error("You need to login to track chats");
      return;
    }
    createChat();
  };

  return (
    <div className={`slider ${isopen ? 'open' : 'closed'}`}>
      {isopen ? (
        <div className="chats">
          <div className="No-chats">{titles.length === 0 ? "No chats" : ""}</div>
          <h4>Your Chats</h4>
          <hr style={{ opacity: '0.3', height: '0.1rem', marginBottom: '1rem' }} />

          <div className="chat-inti">
            Create Chat
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTitle();
                }
              }}
              placeholder="chat name"
            />
            <button onClick={handleTitle} disabled={!title.trim()}>
              create +
            </button>
          </div>
        <div className="title-Container">
          {titles.map((t) => (
            <div key={t.id} className="title" onClick={() => showChats(t.id)}>
              {t.title || "Untitled Chat"}
            </div>
          ))}
        </div>
        </div>
      ) : null}

      <div className="slider-remove">
        <i
          onClick={() => setIsOpen(!isopen)}
          className={`fa-solid ${isopen ? 'fa-circle-arrow-left' : 'fa-circle-arrow-right'}`}
        ></i>
      </div>
    </div>
  );
}
