declare module "@novnc/novnc" {
    export default class RFB {
      constructor(target: HTMLElement, url: string, options?: any);
  
      disconnect(): void;
      sendCtrlAltDel(): void;
  
      scaleViewport: boolean;
      resizeSession: boolean;
      viewOnly: boolean;
      qualityLevel: number;
      compressionLevel: number;
  
      addEventListener(type: string, listener: EventListener): void;
    }
  }
  