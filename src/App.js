import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5002/api/chat", {
        message: userInput,
      });

      const botResponse = response.data.choices[0].message.content;

      setChatHistory([...chatHistory, { text: userInput, isUser: true }]);
      setChatHistory([...chatHistory, { text: botResponse, isUser: false }]);

      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Agricultural Assistant</h1>
      <div className="messages">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask about agriculture..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
