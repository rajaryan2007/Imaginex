'use client'

import { addShapeToCanvas } from '@/fabric/fabric-utils';
import { shapeDefinations, shapeTypes } from '@/fabric/shapes/shape-definations';
import { useEditorStore } from '@/store/store';
import { useEffect, useRef, useState } from 'react';

function ElementsPanels() {
  
  const {canvas, markAsModified} = useEditorStore();

  const miniCanvasRef = useRef({});
  const canvasElementRef = useRef({});
  const [isInitialized,setIsInitialized] = useState(false);
  
  useEffect(()=>{
    if(isInitialized) return;
    
    const timer = setTimeout(async()=>{
      try {
        const fabric = await import('fabric');
        for (const shape of shapeTypes) {
          const canvasElement = canvasElementRef.current[shape];
          if(!canvasElement) continue;
          const canvasId = `mini-canvas-${shape}-${Date.now()}`
          canvasElement.id = canvasId;
          
          try {       
            const defination = shapeDefinations[shape];
            
            const miniCanvas = new fabric.StaticCanvas(canvasId,{
              width:100,
              height:100,
              backgroundColor:'transparent',
              renderOnAddRemove:true,
            })
            
            miniCanvasRef.current[shape] = miniCanvas;
            
            defination.thumbnail(fabric, miniCanvas);
            
            const objects = miniCanvas.getObjects();
            if (objects.length > 0) {
              let obj = objects[0];
              
              if (objects.length > 1) {
                // Remove individual objects and add them as a single group for consistent scaling
                miniCanvas.clear();
                obj = new fabric.Group(objects);
                miniCanvas.add(obj);
              }
              
              // Standardize object properties for thumbnail display
              obj.set({
                originX: 'center',
                originY: 'center',
                left: miniCanvas.width / 2,
                top: miniCanvas.height / 2,
              });

              // Scale to fit while maintaining aspect ratio
              const padding = 12;
              const availableWidth = miniCanvas.width - (padding * 2);
              const availableHeight = miniCanvas.height - (padding * 2);
              
              const objWidth = obj.width * obj.scaleX || 1;
              const objHeight = obj.height * obj.scaleY || 1;
              
              const scale = Math.min(availableWidth / objWidth, availableHeight / objHeight);
              
              obj.scale(scale * 0.9); // Slight extra margin
              
              miniCanvas.requestRenderAll();
            }

          } catch (DefinationError) {
            console.error("Failed to initialize fabric",DefinationError);
          }

        }
      } catch (error) {
        console.error("Failed to initialize fabric",error);
      }
   },100);
    return ()=> clearTimeout(timer);
  },[isInitialized])
   
  useEffect(()=>{
     return ()=>{
      Object.values(miniCanvasRef.current)
      .forEach(miniCanvas =>{
        if(miniCanvas && typeof miniCanvas.dispose === 'function'){
          try {
            miniCanvas.dispose();
          } catch (error) {
            console.error("Failed to dispose mini canvas",error);
          }
        }
      });

      miniCanvasRef.current = {};
      setIsInitialized(false);
     }
  },[])
  
  const setCanvasRef = (el,shape)=>{
    if(!el) return;
    canvasElementRef.current[shape] = el;
  }

  const handleShapeClick = (type)=>{
    addShapeToCanvas(canvas,type);
    markAsModified();
  }
  return (
    <div className='h-full overflow-y-auto' >
      <div className="p-4">
        <div className='grid grid-cols-3 gap-1' >
          {
            shapeTypes.map(shape=>(
              <div 
              style={{
                height:'100px',
                width:'100px',
                cursor:'pointer',  
              }}
              onClick={()=> handleShapeClick(shape)}
              className='cursor-pointer flex flex-col items-center justify-center'
              key={shape}>
                <canvas 
                  width={100}
                  height={100}
                  ref={(el)=> setCanvasRef(el,shape)}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div> 
  )
}


export default ElementsPanels;
