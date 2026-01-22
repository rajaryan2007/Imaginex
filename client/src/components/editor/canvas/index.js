"use client"

import { initializeFabric } from "@/fabric/fabric-utils"
import { useEffect, useRef } from "react"
import { useEditorStore } from "@/store/store";

function Canvas() {

  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const initAttemptRef = useRef(false)
  const { setCanvas, markAsModified } = useEditorStore();
  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose()
        } catch (e) {
          console.error('Error disposing Canvas', e);

        }

        fabricCanvasRef.current = null;
        setCanvas(null)
      }
    }

    cleanUpCanvas()

    initAttemptRef.current != false;

    const initCanvas = async () => {
      if (typeof window === "undefined" || !canvasRef.current || initAttemptRef.current) {
        return;
      }

      initAttemptRef.current = true;
      try {
        const canvasInstance = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current
        );

        if (!canvasInstance) {
          console.error("Failed to initialize Fabric.js canvas");
          return;
        }

        fabricCanvasRef.current = canvasInstance;

        // set the canvas in store
        setCanvas(canvasInstance);

        console.log("Canvas init is done and set in store");
      } catch (e) {
        console.error("Failed to init canvas", e);
      }
    };

    const timer = setTimeout(() => {
      initCanvas()
    }, 50)

    return () => {
      clearTimeout(timer)
      cleanUpCanvas();
    }
  }, [setCanvas]);


  return (
    <div className="relative w-full h-full flex items-center justify-center" ref={canvasContainerRef}>
      {/* This creates the actual HTML element for Fabric.js to hook into */}
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas;

