import React, { useState, useEffect } from "react";
import { Input, Button, List, Avatar, Card } from "antd";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { sender: "John", text: "Hi there!" },
    { sender: "Jane", text: "Hello!" },
    { sender: "John", text: "How are you?" },
    { sender: "Jane", text: "I'm good, thanks. How about you?" },
    { sender: "John", text: "I'm doing well, thanks for asking." },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { sender: "John", text: inputValue }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const chatList = document.querySelector(".chat-list");
    chatList.scrollTop = chatList.scrollHeight;
  }, [messages]);

  return (
    <Card style={{ padding: 0 }}>
      <div className="chat-room-container">
        <div className="chat-list">
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item
                className={
                  item.sender === "John" ? "message-right" : "message-left"
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor:
                          item.sender === "John" ? "#87d068" : "#f56a00",
                      }}
                    >
                      {item.sender[0]}
                    </Avatar>
                  }
                  title={item.sender}
                  description={item.text}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="chat-input">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handleSendMessage}
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatRoom;
