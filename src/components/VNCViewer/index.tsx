import React, { useEffect, useRef } from "react";
import RFB from "@novnc/novnc";

const VNCViewer: React.FC = () => {
  const vncContainer = useRef<HTMLDivElement>(null);
  let rfb: RFB | null = null;

  useEffect(() => {
    if (!vncContainer.current) return;

    const url = "ws://192.168.178.46:6080/websockify";
    rfb = new RFB(vncContainer.current, url, {
      credentials: { password: "lab1" },
    });

    rfb.viewOnly = false;
    rfb.scaleViewport = true;
    rfb.resizeSession = true;
    rfb.qualityLevel = 6;
    rfb.compressionLevel = 2;

    const resizeCanvas = () => {
      const canvas = vncContainer.current?.querySelector("canvas");
      if (canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.objectFit = "cover";
        canvas.style.display = "block"; // Removes default spacing
      }
    };

    // Wait for the canvas to appear in the DOM
    const observer = new MutationObserver(() => resizeCanvas());
    observer.observe(vncContainer.current, { childList: true, subtree: true });
    

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (rfb) rfb.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={vncContainer}
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    />
  );
};

export default VNCViewer;
