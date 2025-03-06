import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot"; // ✅ Strict type
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    const token = localStorage.getItem("token"); // ✅ Get JWT token

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Send token
          
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]); // ✅ Ensure sender is "bot"
    } catch (error) {
      console.error("❌ API Error:", error);
      setMessages([...newMessages, { text: "Error: API failed", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div className="relative bg-gray-900 rounded-xl p-4 shadow-lg -mt-10 border border-gray-700">
      <div className="flex items-center justify-between text-white font-bold text-lg mb-2">
        <span>🤖 Chatbot</span>
      </div>

      <div className="flex-grow h-[300px] overflow-y-auto bg-gray-800 p-3 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md my-1 w-fit ${
                msg.sender === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="flex mt-3 border border-gray-600 rounded-lg overflow-hidden w-full">
        <input
          type="text"
          className="flex-grow p-2 bg-gray-700 text-white outline-none placeholder-gray-400 w-full"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shrink-0"
          style={{ minWidth: "60px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
