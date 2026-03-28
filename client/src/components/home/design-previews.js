"use client"

import { useState, useRef, useEffect } from "react"

function DesingPreview({ design }) {

    const [canvasId] = useState(`canvas-${design?._id}-${Date.now()}`)
    const fabricCanvasRef = useRef(null);

    useEffect(() => {
        if (!design?.canvasData) return;

        const Timer = setTimeout(async () => {
            try {
                if (fabricCanvasRef.current && typeof fabricCanvasRef.current.dispose === "function") {
                    try {
                        fabricCanvasRef.current.dispose();
                    } catch (e) {
                        console.error("error while disposing canvas", e)
                    }
                }

                const fabric = await import('fabric')
                const canvasElement = document.getElementById(canvasId);

                if (!canvasElement) return;

                // Use the original design dimensions to calculate scale
                const origWidth = design.width || 800;
                const origHeight = design.height || 600;

                // Preview container size
                const previewWidth = 300;
                const previewHeight = 200;

                const designPreviewCanvas = new fabric.StaticCanvas(canvasElement, {
                    width: previewWidth,
                    height: previewHeight,
                    renderOnAddRemove: false,
                })

                fabricCanvasRef.current = designPreviewCanvas;

                let canvasData = design.canvasData;

                try {
                    canvasData = typeof canvasData === "string" ? JSON.parse(canvasData) : canvasData;
                } catch (error) {
                    console.error("Error parsing canvas data");
                    return;
                }

                // Set the background color
                if (canvasData.background) {
                    designPreviewCanvas.backgroundColor = canvasData.background;
                } else {
                    designPreviewCanvas.backgroundColor = "#ffffff";
                }

                // Add all objects
                if (canvasData.objects && canvasData.objects.length > 0) {
                    try {
                        const enlivenedObjects = await fabric.util.enlivenObjects(canvasData.objects);
                        enlivenedObjects.forEach(obj => {
                            designPreviewCanvas.add(obj);
                        });
                    } catch (err) {
                        console.error('Error enlivening objects:', err);
                    }
                }

                // Use viewport transform to zoom and center the entire design
                // so it fits perfectly in the preview thumbnail
                const zoom = Math.min(previewWidth / origWidth, previewHeight / origHeight);
                const offsetX = (previewWidth - origWidth * zoom) / 2;
                const offsetY = (previewHeight - origHeight * zoom) / 2;

                designPreviewCanvas.setViewportTransform([zoom, 0, 0, zoom, offsetX, offsetY]);
                designPreviewCanvas.requestRenderAll();

            } catch (e) {
                console.error("Error rendering design preview data", e);
            }
        }, 150)

        return () => {
            clearTimeout(Timer)
            if (fabricCanvasRef.current && typeof fabricCanvasRef.current.dispose === "function") {
                try {
                    fabricCanvasRef.current.dispose();
                } catch (e) {
                    console.error("error while disposing canvas", e)
                }
            }
        }
    }, [design?._id, canvasId])

    return (
        <canvas
            id={canvasId}
            width={"300"}
            height={"200"}
            className="w-full h-full object-contain"
        />
    )
}

export default DesingPreview