import React, { useState, useRef, useEffect } from "react";

export default function MainChatArea({ messages, user }) {
  const [newMessage, setNewMessage] = useState("");
  const [isTextArea, setIsTextArea] = useState(false);
  const textAreaRef = useRef(null);
  const [localMessages, setLocalMessages] = useState(messages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim()) {
      const message = {
        id: localMessages.length + 1,
        user: user,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: newMessage,
        status: "Delivered",
        avatar:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        isRead: false,
      };

      setLocalMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(newMessage);
      setNewMessage("");
      setIsTextArea(false);
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setIsTextArea(true);
      setNewMessage((prev) => prev + "\n");
      setTimeout(() => {
        textAreaRef.current?.focus();
        const length = textAreaRef.current.value.length;
        textAreaRef.current.setSelectionRange(length, length);
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
      }, 0);
    }
  };

  return (
    <div>
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto h-[80vh] lg:h-[75vh]">
        {/* Render chat messages dynamically */}
        {localMessages.map((message, index) => {
          const showAvatar =
            index === localMessages.length - 1 ||
            localMessages[index + 1]?.user !== message.user;
          const showUser = localMessages[index - 1]?.user !== message.user;
          const showTime =
            index === 0 ||
            new Date(`1970-01-01T${message.time}:00`) -
              new Date(`1970-01-01T${localMessages[index - 1].time}:00`) >=
              60000;

          return (
            <div
              key={message.id}
              className={`chat chat-${
                message?.user === user ? "end" : "start"
              }`}
            >
              {showAvatar ? (
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={message.avatar} />
                  </div>
                </div>
              ) : (
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {/* <img alt="User Avatar" src={message.avatar} /> */}
                  </div>
                </div>
              )}
              <div className="chat-header">
                {showUser && message.user}{" "}
                {showTime && (
                  <time className="text-xs opacity-50">{message.time}</time>
                )}
              </div>
              <div className="chat-bubble" style={{ whiteSpace: "pre-wrap" }}>
                {message.content}
              </div>
              {index === localMessages.length - 1 ||
              localMessages[index + 1].user !== message.user ? (
                <div className="chat-footer opacity-50">{message.status}</div>
              ) : null}
            </div>
          );
        })}
        {/* Reference for scrolling */}
        <div ref={chatEndRef} />
      </div>

      {/* Message input area */}
      <div className="mt-4 flex items-center">
        {isTextArea ? (
          <textarea
            as="textarea"
            placeholder="Type a message..."
            className="textarea textarea-bordered w-full max-h-52 "
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            ref={textAreaRef}
          />
        ) : (
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
        <button
          className="btn btn-primary ml-5"
          onClick={() => handleSendMessage(newMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
