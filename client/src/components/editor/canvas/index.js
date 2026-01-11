"use client"

import { initializeFabric } from "@/fabric/fabric-utils"
import { useEffect, useRef } from "react"


function Canvas() {

  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const initAttemptRef = useRef(false)

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
      if (typeof window === undefined || !canvasRef.current || initAttemptRef.current) {
        return
      }

      initAttemptRef.current = true
      try {
        const fabricCanvasRef = await initializeFabric(canvasRef.current, canvasContainerRef.current)

        if (!fabricCanvasRef) {
          console.error('Faild to initialize Fabric.js canvas')

          return
        }

        fabricCanvasRef.current = fabricCanvas
        //set the canvas in store
        setCanvas(fabricCanvas)

        console.log('Canvas init is done and set in store');

        //apply custom style for the controls 
        //to do 


      } catch (e) {
        console.error('Failed to init canvas', e);
      }
    }

    const timer = setTimeout(() => {
      initCanvas()
    }, 50)

    return () => {
      clearTimeout(timer)
      cleanUpCanvas();
    }
  }, [])


  return (
    <div className="relative w-full h-[600px] overflow-auto" ref={canvasContainerRef}>
      {/* This creates the actual HTML element for Fabric.js to hook into */}
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas;

