import { useState, useEffect, useRef } from "react";
import Navbar from "@/scenes/navbar";
import Header from "@/scenes/header";
import TaskAccordion from "@/scenes"; 
import Footer from "@/scenes/footer";
import Chatbot from "@/scenes/chatbot"; 
import { tasks } from "@/data/tasks"; 
import VNCViewer from "@/components/VNCViewer";

const Challenges = () => {
  const userId = "user-123"; 
  const [showVNC, setShowVNC] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [openTasks, setOpenTasks] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const openVNCFullScreen = () => {
    window.open("http://192.168.178.46:6080/vnc.html", "_blank");
  };

  // Function to check scroll state and show/hide footer
  const checkScrollState = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const needsScroll = scrollHeight > clientHeight;
      setShowFooter(!needsScroll);
    }
  };

  // When tasks open/close, recheck scrolling and adjust footer visibility
  useEffect(() => {
    setTimeout(() => checkScrollState(), 300); // Delay ensures DOM updates before checking
  }, [openTasks]);

  return (
    <div className="bg-gray-800 text-text"
      style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, display: "flex", flexDirection: "row" }}>
      
      {/* Left Side - Training Platform */}
      <div style={{
        width: showVNC ? "50vw" : "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: "50vw"
      }}>
        <Navbar />
        <Header onStartAttack={() => setShowVNC(true)} />

        {/* Scrollable Content */}
<div ref={contentRef}
  onScroll={checkScrollState}
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // ✅ Keeps footer at the bottom
    flexGrow: 1,
    height: "100%", // ✅ Ensures it fills parent
    overflowY: "auto",
  }}
>
  {/* Task List */}
  <div style={{ flexGrow: 1, padding: "10px" }}>
    <TaskAccordion 
      userId={userId} 
      tasks={tasks} 
      onTaskToggle={(isOpen: boolean) => setOpenTasks((prev) => (isOpen ? prev + 1 : prev - 1))}
    />
  </div>

  {/* Footer - Only visible when scrolling is NOT needed */}
  {showFooter && <Footer />}
</div>
      </div>

      {/* Chatbot Section */}
      <div style={{
        flex: chatExpanded ? 0.25 : 0.02,
        backgroundColor: "#222",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "2px solid gray",
        paddingRight: showVNC ? "0" : "10px",
        borderRadius: chatExpanded ? "10px" : "0",
        minWidth: chatExpanded ? "350px" : "50px",  // ✅ Different minWidth based on state
        overflow: "hidden"
      }}>
        <button onClick={() => setChatExpanded(!chatExpanded)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "20px"
          }}>
          {chatExpanded ? "◀" : "🤖"}
        </button>

        {chatExpanded && <Chatbot />}
      </div>

      {/* Right Side - Remote Desktop */}
      {showVNC && (
        <div style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          margin: 0,
          padding: 0,
          minWidth: "50vw"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", background: "#222", padding: "5px" }}>
            <button onClick={() => setShowVNC(false)}
              style={{ color: "white", fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>
              ➖
            </button>
            <span style={{ color: "white", fontSize: "14px" }}>Remote Desktop</span>
            <button onClick={openVNCFullScreen}
              style={{ color: "white", fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>
              ➕
            </button>
          </div>

          <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
            <VNCViewer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
