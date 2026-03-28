import { Erica_One } from 'next/font/google'
import { shapeDefinations } from './shapes/shape-definations'
import { createShape } from './shapes/shape-factory'



export const initializeFabric = async (canvasE1, containerE1) => {
  try {
    const { Canvas, PencilBrush } = await import('fabric')

    const canvas = new Canvas(canvasE1, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true
    })

    const brush = new PencilBrush(canvas)
    brush.color = "#000000"
    brush.width = 5
    canvas.freeDrawingBrush = brush

    return canvas;
  } catch (e) {
    console.error("falied to load favric", e);
    return null;
  }
}

  


export const centerCanvas = (canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const updateLayout = () => {
    const canvasWrapper = canvas.wrapperEl;
    
    // Calculate available screen space
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Mobile devices need more vertical room for the bottom tabs and top header
    const isMobile = windowWidth < 768;
    const paddingX = isMobile ? 32 : 120;
    const paddingY = isMobile ? 240 : 120; 
    
    const availableWidth = windowWidth - paddingX;
    const availableHeight = windowHeight - paddingY;
    
    const scaleX = availableWidth / canvas.width;
    const scaleY = availableHeight / canvas.height;
    
    // Scale down if canvas is larger than screen, bounded by 1 so it doesn't digitally artificially blow up small designs
    const scale = Math.min(scaleX, scaleY, 1);

    canvasWrapper.style.width = `${canvas.width}px`;
    canvasWrapper.style.height = `${canvas.height}px`;

    canvasWrapper.style.position = "absolute";
    canvasWrapper.style.top = isMobile ? "45%" : "50%";
    canvasWrapper.style.left = "50%";
    canvasWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    canvasWrapper.style.transformOrigin = "center center";

    // Re-calculate fabric's internal hitboxes to match the new CSS scale
    canvas.calcOffset();
  };

  updateLayout();

  // Attach a window resize listener, ensuring we don't attach multiple
  if (!canvas._hasResizeListener) {
    window.addEventListener('resize', () => {
      // Debounce the resize slightly
      clearTimeout(canvas._resizeTimer);
      canvas._resizeTimer = setTimeout(() => {
        updateLayout();
      }, 100);
    });
    canvas._hasResizeListener = true;
  }
}


export const addShapeToCanvas = async (canvas,shapeType,customProps={})=>{
  if(!canvas || !shapeType) return null; 
  try {
    const fabricModule = await import('fabric');
    
    const shape = createShape(fabricModule,shapeType,shapeDefinations,{
      left: 100,
      top: 100,
      ...customProps
    })

    if(shape){
      shape.id = `${shapeType}-${Date.now()}`;
      canvas.add(shape);
      canvas.renderAll();
      canvas.setActiveObject(shape);
      return shape;
    }
    return null;
  } catch (error) {
    console.error("Failed to add shape to canvas",error);
    return null;
  }
}


export const addTextToCanvas = async (canvas, textType, customProps = {},withBackground=false) => {
  if (!canvas || !textType) return null;

  try {   
    const { Textbox } = await import('fabric');

    let textObject;
    const baseProps = {
      left: 100,
      top: 100,
      fill: '#000000',
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'normal',
      textAlign: 'left',
      charSpacing: 0,
      lineHeight: 1.2,
      backgroundColor: 'transparent',
      stroke: null,
      strokeWidth: 0,
      shadow: null,
      
      ...customProps
    };

    textObject = new Textbox(textType,{
      ...baseProps,
      width: 200,
      height: 100,
    });

    if (textObject) {
      textObject.id = `text-${Date.now()}`;
      canvas.add(textObject);
      canvas.setActiveObject(textObject);
      canvas.renderAll();
      return textObject;
    }

    return null;
  } catch (error) {
    console.error("Failed to add text to canvas", error);
    return null;
  }
};

export const  toggleDrawingMode = (canvas,isDrawingMode,drawingColor = "#000000",brushWidth = 5) => {
  if(!canvas) return null;

  try{
    canvas.isDrawingMode = isDrawingMode
    if(isDrawingMode){
      canvas.freeDrawingBrush.color = drawingColor
      canvas.freeDrawingBrush.width = brushWidth;
    }
    return true;
  }catch(e){
    return false;
  }
}

export const toggleEraseMode = (canvas,isErasing,previousColor = "#000000",eraseWidth = 20)=>{
  if(!canvas || !canvas.freeDrawingBrush) return false;

  try{
      if(isErasing){
        canvas.freeDrawingBrush.color = "#ffffff"
        canvas.freeDrawingBrush.width = eraseWidth;
      }else{
        canvas.freeDrawingBrush.color = previousColor;
        canvas.freeDrawingBrush.width = 5;
      }
      return true;
  }catch(e){
    return false;
  }
}

export const updateDrawingBrush = (canvas,properties = {})=>{
  if(!canvas || !canvas.freeDrawingBrush ) return false;

  try {
    const {color,width,opacity} = properties;
    if(color !== undefined){
      canvas.freeDrawingBrush.color = color;
    }
    if(width !== undefined){
      canvas.freeDrawingBrush.width = width;
    }
    if(opacity !== undefined){
      canvas.freeDrawingBrush.opacity = opacity;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export const addImageToCanvas = async(canvas,ImageUrl)=>{
  if(!canvas) return null;

  try {
    const {Image:FabricImage} = await import('fabric');
    
    let imgObj = new Image();
    imgObj.crossOrigin = "anonymous";
    imgObj.src = ImageUrl;

    return new Promise((resolve,reject)=>{
      imgObj.onload = () => {
         let image = new FabricImage(imgObj)
         image.set({
          id:`image-${Date.now()}`,
          left: 100,
          top: 100,
          padding: 10,
          cornorSize: 10
         })

         const maxDimension = 400;

         if(image.width > maxDimension || image.height > maxDimension){
          image.scaleToWidth(maxDimension);
          image.scaleToHeight(maxDimension);
         }
         canvas.add(image);
         canvas.renderAll();
         resolve(image);
      }
      imgObj.onerror = (error) => {
        reject(new Error("Failed to load image",ImageUrl));
      }
    })

  } catch (error) {
    console.log("error while rendering image in canvas");
    

    return null
  }
}