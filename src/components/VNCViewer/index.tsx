import React, { useEffect, useRef } from "react";
import RFB from "@novnc/novnc"; 

const VNCViewer: React.FC = () => {
  const vncContainer = useRef<HTMLDivElement>(null);
  let rfb: RFB | null = null;

  useEffect(() => {
    if (vncContainer.current) {
      const url = "ws://192.168.178.46:6080/websockify"; 
      console.log("Connecting to:", url);
      
      try {
        rfb = new RFB(vncContainer.current, url, {
          credentials: { password: "lab1" },
        });

        rfb.scaleViewport = true;  
        rfb.resizeSession = true;  
        rfb.qualityLevel = 6;
        rfb.compressionLevel = 2;

        rfb.addEventListener("connect", () => console.log("✅ Connected to VNC"));
        rfb.addEventListener("disconnect", () => console.log("❌ Disconnected from VNC"));
        rfb.addEventListener("securityfailure", () => console.log("⚠️ VNC Security Failure"));

      } catch (error) {
        console.error("🚨 Error initializing VNC RFB:", error);
      }

      return () => {
        if (rfb) {
          rfb.disconnect();
        }
      };
    }
  }, []);

  return <div ref={vncContainer} style={{ width: "100%", height: "100%", margin: 0, padding: 0, display: "flex", backgroundColor: "black" }} />;
};

export default VNCViewer;
