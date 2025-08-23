// Home.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useSubscription } from "@apollo/client";
import { StartChat, SendUserMessage, SendMessage, OnMessages } from "../../../public/mutations.js";
import nhost from "../../Nhost/nhostClient.js";
import Header from "../../component/header/header.jsx";
import Slider from "../../component/Slider/slider.jsx";
import ChatBox from "../../component/ChatBox/ChatBox.jsx";
import InputBox from "../../component/InputBox/InputBox.jsx";
import Intro from "../../component/Intro/Intro.jsx";
import "./Home.css";
import { useUserData } from "@nhost/react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [chatId, setChatId] = useState(null);
  const endRef = useRef(null);
  const [load, setLoad] = useState(false);
  const user = useUserData();
  const [title, setTitle] = useState("");
  const [chatData, setchatData] = useState([]);
  const [titles, setTitles] = useState([]);

  let userName;
  if (user && user.displayName !== "Anonymous User") {
    userName = user.displayName;
  }

  let firstMsg = msgs?.length === 0;

  // Subscription
  const { data: subData } = useSubscription(OnMessages, {
    variables: { chatId },
    skip: !chatId,
  });

  // Update msgs
  useEffect(() => {
    if (Array.isArray(subData?.messages)) {
      setMsgs(subData.messages);
      setLoad(false);
    }
  }, [subData]);

  useEffect(() => {
    if (Array.isArray(chatData?.messages)) {
      setMsgs(chatData.messages);
      setLoad(false);
    }
  }, [chatData]);

  // Auto-scroll
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);


  const createChat = useCallback(async () => {
    if (!title.trim()) return;
    try {
      const { data, error } = await nhost.graphql.request(StartChat, { title:title });
      if (error) {
        toast.error("Failed to create chat");
        return;
      }

      const newChat = data.insert_chats_one;
      setTitles((prev) => [newChat, ...prev]);
      setChatId(newChat.id);
      setTitle("");
      toast.success("Chat created successfully ");
    } catch (err) {
      toast.error(err.message || "Error creating chat");
    }
  }, [title]);


  const sendMessage = useCallback(async () => {
    const userMessage = msg.trim();
    if (!userMessage) return;

    if (!chatId) {
      toast.error(" You need to select or create a chat first");
      return;
    }

    try {
      // पहले UI में दिखाओ
      setMsgs((prev) => [
        ...prev,
        { id: uuidv4(), sender: "user", content: userMessage },
      ]);
      setLoad(true);

      // DB में save करो
      await nhost.graphql.request(SendUserMessage, { content: userMessage, chatId });
      await nhost.graphql.request(SendMessage, { message: userMessage, chat_id: chatId });
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    }
    setMsg("");
  }, [msg, chatId]);

  return (
    <div className="console-div">
      <Slider
        setTitle={setTitle}
        sendMessage={sendMessage}
        createChat={createChat}  
        setChatId={setChatId}
        setTitles={setTitles}
        setchatData={setchatData}
        titles={titles}
        title={title}
      />

      <div className="home">
        <Header load={load} />
        {firstMsg ? <Intro firstMsg={userName} /> : ""}
        <ChatBox msgs={msgs} endRef={endRef} />
        <InputBox msg={msg} setMsg={setMsg} sendMessage={sendMessage} firstMsg={firstMsg} />
      </div>
    </div>
  );
}
