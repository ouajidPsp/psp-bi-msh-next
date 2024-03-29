{
  /*"use client";
import { User } from "@prisma/client";
import React, { useState, useEffect, useRef } from "react";
import Welcome from "./Welcome";

import { Socket, io } from "socket.io-client";
import { useSession } from "@/Contexts/UserContext";
import { Contacts } from "./Contacts";

export type data = {
  contacts: User[];
  changeChat: (user: User) => void;
  selected?: User;
};

export default function Chat({ contacts }: { contacts: data["contacts"] }) {
  const [selected, setselected] = useState<User>();

  return (
    <div className="flex flex-col justify-center items-center gap-4 border border-[#396EA5] rounded-3xl">
      <div className="h-[75vh] w-[75vw] grid grid-cols-[25%_75%] lg:grid-cols-[35%_65%]">
        <Contacts contacts={contacts} changeChat={setselected} />
        {!selected ? (
          <Welcome />
        ) : (
          
          <ChatContainer key={selected.id} currentUser={selected} />
        )}
      </div>
    </div>
  );
}
*/
}
import { User } from "@prisma/client";
import React from "react";
export type data = {
  contacts: User[];
  changeChat: (user: User) => void;
  selected?: User;
};
export default function Chat({ contacts }: { contacts: data["contacts"] }) {
  return <div>Chat</div>;
}
