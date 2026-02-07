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

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
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
