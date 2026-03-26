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
    return fetchWithAuth(`/v1/design/${designId}`, {
        method: "DELETE"
    })
}

export async function saveCanvasState(canvas, designId = null, title = "Untitled project") {
    if (!canvas) return false;

    try {
        const canvasJson = canvas.toJSON();
        const designData = {
            title: title,
            canvasState: canvasJson,
            width: canvas.width,
            height: canvas.height
        }
    } catch (error) {
        throw new Error("Failed to save canvas state", error)
    }
}
