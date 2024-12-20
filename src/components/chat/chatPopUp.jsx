import React from "react";

const chatPopUp = () => {
  return (
    <div className="chat-popup bg-white p-4 rounded-lg shadow-lg border border-gray-300 w-96 h-5/6 fixed z-50 right-10 bottom-10">
      Sidebar for conversations
      <div className="w-1/4 bg-base-200 p-4">
        <h2 className="text-lg font-bold">Chats</h2>
        <ul className="mt-4">
          {/* Example conversation items */}
          <li className="p-2 hover:bg-base-300 cursor-pointer">User 1</li>
          <li className="p-2 hover:bg-base-300 cursor-pointer">User 2</li>
        </ul>
      </div>
      {/* Main chat area */}
      <div className="flex-1 bg-base-100 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* Render chat messages dynamically */}
          {messages.map((message, index) => {
            const showAvatar =
              index === messages.length - 1 ||
              messages[index + 1]?.user !== message.user;
            const showUser = messages[index - 1]?.user !== message.user;
            const showTime =
              index === 0 ||
              new Date(`1970-01-01T${message.time}:00`) -
                new Date(`1970-01-01T${messages[index - 1].time}:00`) >=
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
                {index === messages.length - 1 ||
                messages[index + 1].user !== message.user ? (
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
              ref={textAreaRef} // Added ref to textarea
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
          <button className="btn btn-primary  ml-5" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default chatPopUp;
