import { method } from "lodash";
import { fetchWithAuth } from "./service.js";




export async function getUserDesign() {
    return fetchWithAuth('/v1/designs', {
        method: "GET"
    })
}

export async function getUserDesignID(designId) {
    return fetchWithAuth(`/v1/designs/${designId}`, {
        method: "GET"
    });
}

export async function saveDesign(designData, designId = null) {
    return fetchWithAuth(`/v1/designs`, {
        method: 'POST',
        body: {
            ...designData,
            designId
        }
    });
}

export async function deleteDesign(designId) {
    return fetchWithAuth(`/v1/designs/${designId}`, {
        method: "DELETE"
    })
}

export async function saveCanvasState(canvas, designId = null, title = "Untitled project") {
    if (!canvas) return false;

    try {
        const canvasData = {
            width: canvas.width,
            height: canvas.height,
            backgroundColor: canvas.backgroundColor,
            objects: canvas.getObjects().map(obj => {
                const data = {
                    type: obj.type,
                    left: obj.left,
                    top: obj.top,
                    width: obj.width,
                    height: obj.height,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY,
                    angle: obj.angle,
                    opacity: obj.opacity,
                    fill: obj.fill,
                    stroke: obj.stroke,
                    strokeWidth: obj.strokeWidth,
                    originX: obj.originX,
                    originY: obj.originY,
                    flipX: obj.flipX,
                    flipY: obj.flipY,
                    metadata: obj.metadata || {}
                };

                if (obj.type === 'image') {
                    data.src = obj.src;
                    data.crossOrigin = obj.crossOrigin;
                }

                if (obj.type === 'text') {
                    data.text = obj.text;
                    data.fontSize = obj.fontSize;
                    data.fontFamily = obj.fontFamily;
                    data.fontWeight = obj.fontWeight;
                    data.fontStyle = obj.fontStyle;
                    data.textAlign = obj.textAlign;
                    data.fill = obj.fill;
                }

                if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
                    data.fill = obj.fill;
                    data.stroke = obj.stroke;
                    data.strokeWidth = obj.strokeWidth;
                }

                return data;
            })
        };

        const response = await saveDesign({
            title,
            canvasData,
            thumbnail: null
        }, designId);

        return response.success;
    } catch (error) {
        console.error("Error saving canvas state:", error);
        return false;
    }
}