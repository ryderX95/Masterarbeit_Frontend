import { useState } from "react";
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

  const openVNCFullScreen = () => {
    window.open("http://192.168.178.46:6080/vnc.html", "_blank");
  };

  return (
    <div className="bg-gray-800 text-text" style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
      
      {/* Main Split-Screen Layout */}
      <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
        
        {/* Left Side - Training Platform */}
        <div style={{ 
          width: showVNC ? "50vw" : "100vw", 
          height: "100vh", 
          display: "flex", 
          flexDirection: "column", 
          overflow: "hidden", 
          minWidth: "50vw" // ✅ Prevents collapse
        }}>
          <Navbar />
          <Header onStartAttack={() => setShowVNC(true)} />
          <TaskAccordion userId={userId} tasks={tasks} />
          <Chatbot />
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
            minWidth: "50vw" // ✅ Prevents overlap
          }}>
            {/* Control Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", background: "#222", padding: "5px" }}>
              <button onClick={() => setShowVNC(false)} style={{ color: "white", fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>➖</button>
              <span style={{ color: "white", fontSize: "14px" }}>Remote Desktop</span>
              <button onClick={openVNCFullScreen} style={{ color: "white", fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>➕</button>
            </div>
            
            {/* VNC Viewer (100% size) */}
            <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
              <VNCViewer />
            </div>
          </div>
        )}
      </div>

      {/* Hide Footer when VM is active */}
      {!showVNC && <Footer />}
    </div>
  );
};

export default Challenges;
