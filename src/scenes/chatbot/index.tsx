import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("❌ API Error:", error);
      setMessages([...newMessages, { text: "Error: API failed", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "#222",
        border: "1px solid gray",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        flexGrow: 1,
        minHeight: "350px",
        maxHeight: "100%",
      }}
    >
      {/* Chatbot Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#333",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "10px 10px 0 0",
          flexShrink: 0,
        }}
      >
        🤖 Chatbot
      </div>

      {/* Messages Section */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "#444",
          padding: "10px",
          minHeight: "200px",
          maxHeight: "calc(100% - 60px)",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "lightgray", fontSize: "14px", textAlign: "center" }}>
            No messages yet...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#007AFF" : "#555",
                color: "white",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input & Send Button */}
      <div
        style={{
          display: "flex",
          padding: "8px",
          backgroundColor: "#333",
          borderRadius: "0 0 10px 10px",
          flexShrink: 0,
          minHeight: "50px",
        }}
      >
        <input
          type="text"
          style={{
            flexGrow: 1,
            padding: "10px",
            backgroundColor: "#555",
            color: "white",
            border: "none",
            outline: "none",
            borderRadius: "6px",
            minWidth: "60px", 
          }}
          placeholder="..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            padding: "10px 14px",
            backgroundColor: "#007AFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            minWidth: "40px", 
          }}
        >
          {window.innerWidth < 350 ? ">" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
