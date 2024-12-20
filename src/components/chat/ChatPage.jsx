import React, { useState } from "react";
import MainChatArea from "./MainChatArea"; // Import MainChatArea

const ChatPage = () => {
  const [user, setUser] = useState("Mahmudul");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Mahmudul",
      time: "12:45",
      content: "Hello!",
      status: "Delivered",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      isRead: false,
    },
    {
      id: 2,
      user: "Other User",
      time: "12:46",
      content: "Hi there!",
      status: "Seen at 12:46",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      isRead: true,
    },
    {
      id: 3,
      user: "Other User",
      time: "12:47",
      content: "How are you?",
      status: "Seen at 12:47",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      isRead: true,
    },
  ]);

  return (
    <div className="flex h-full mt-16 fixed w-full z-50 bg-base-100">
      {/* Sidebar for conversations */}
      <div className="w-1/4 bg-base-200 p-4">
        <h2 className="text-lg font-bold">Chats</h2>
        <ul className="mt-4">
          {/* Example conversation items */}
          <li className="p-2 hover:bg-base-300 cursor-pointer">User 1</li>
          <li className="p-2 hover:bg-base-300 cursor-pointer">User 2</li>
        </ul>
      </div>
      {/* Main chat area */}
      <div className="flex-1 bg-base-100 h-[90vh] p-4 flex flex-col">
        {/* Integrate MainChatArea component */}
        <MainChatArea messages={messages} user={user} />
      </div>
    </div>
  );
};

export default ChatPage;
