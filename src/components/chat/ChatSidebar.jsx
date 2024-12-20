import React, { Component } from "react";

export default function ChatSidebar() {
  return (
    <div className="flex flex-col h-full bg-base-200 p-4">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <div className="overflow-y-auto">
        {/* Chat items */}
        <div className="chat-item bg-base-300 p-2 rounded-lg mb-2 hover:bg-base-400">
          <div className="chat-header">
            <span className="font-semibold">User 1</span>
            <span className="text-sm text-gray-500">12:30 PM</span>
          </div>
          <div className="chat-message text-sm">Hey! How are you?</div>
        </div>
        {/* ... repeat for more chat items ... */}
      </div>
    </div>
  );
}
