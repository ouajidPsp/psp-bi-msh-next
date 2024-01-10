"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { messagesData } from "@/app/(auth)/whatsapp/data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { getTime } from "@/app/(auth)/whatsapp/logic/whatsapp";
import RoundedBtn from "./RoundedBtn";
import cs1 from "@/app/(auth)/whatsapp/assets/images/cs1.png";
import cs2 from "@/app/(auth)/whatsapp/assets/images/cs2.jpeg";
import Image from "next/image";
import bg from "@/app/(auth)/whatsapp/assets/images/bg.webp";

function ChatDetail() {
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef<null | HTMLInputElement>(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  // Functions

  const addMessage = (msg: any) => {
    if (inputRef.current !== null) {
      const newMessages = [...messages, msg];
      setMessages(newMessages);
    }
  };

  const handleEmojiClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.value += "🔥";
      inputRef.current.focus();
    }
  };

  const handleImgUpload = () => {
    addMessage({
      img: cs2,
      time: getTime(),
      sent: true,
    });
  };

  const handleInputChange = () => {
    if (inputRef.current !== null && inputRef.current.value.length === 0) {
      setTyping(false);
    } else if (inputRef.current !== null) {
      setTyping(true);
    }
  };

  const handleInputSubmit = () => {
    if (inputRef.current !== null && inputRef.current.value.length > 0) {
      addMessage({
        msg: inputRef.current.value,
        time: getTime(),
        sent: true,
      });
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "Enter") handleInputSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <Image
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">Coding Spot</h1>

            {/* Status */}
            <p className="text-[#8796a1] text-xs">online</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] bg-contain overflow-y-scroll h-100"
        style={{ backgroundImage: `url(${bg.src})`, padding: "12px 7%" }}
      >
        {messages.map((msg) => (
          <Message
            msg={msg.msg}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={msg.sent}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>

        {/* Input bar */}
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={handleInputChange}
          ref={inputRef}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ChatDetail;
