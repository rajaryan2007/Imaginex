import { shapeDefinations } from "./shape-definations";

export const createShape = (fabric, type,shapeDefinations,customProps={}) =>{
    const defination = shapeDefinations[type];
    if(!defination){
        console.error("Invalid shape type",type);
        return null;
    }

    const proper = {...defination.defaultProps,...customProps};
    switch(defination.type){
        case 'rect':
            return new fabric.Rect(proper);  
        case 'circle':
            return new fabric.Circle(proper);
        case 'triangle':
            return new fabric.Triangle(proper);
        case 'square':
            return new fabric.Rect(proper);
        case 'ellipse':
            return new fabric.Ellipse(proper);
        case 'line':
            // Fabric Line expects [x1, y1, x2, y2] as first arg
            const points = proper.points || [0, 0, 100, 0];
            return new fabric.Line(points, proper);
        case 'polygon':
            return new fabric.Polygon(proper.points || [], proper);
        case 'path':
            return new fabric.Path(proper.path || '', proper);
        default:
            return null;
    }
    
    
}