export function downloadFile(content, fileName, isBase64 = false) {
    const link = document.createElement("a");
    link.href = isBase64 ? content : URL.createObjectURL(new Blob([content]));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportAsImage(canvas, format = 'png', filename = "Design") {
    if (!canvas) return false;
    try {
        // Deselect objects so selection handles aren't exported
        canvas.discardActiveObject();
        canvas.requestRenderAll();

        const dataUrl = canvas.toDataURL({
            format: format === 'jpg' ? 'jpeg' : format,
            quality: 1,
            multiplier: 2 // High res export
        });
        downloadFile(dataUrl, `${filename}.${format}`, true);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function exportAsSvg(canvas, filename = "Design") {
    if (!canvas) return false;
    try {
        const svgString = canvas.toSVG();
        downloadFile(svgString, `${filename}.svg`, false);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function exportAsJson(canvas, filename = "Design") {
    if (!canvas) return false;
    try {
        const canvasData = canvas.toJSON(["id", "filters", "name"]);
        const jsonString = JSON.stringify(canvasData, null, 2);
        downloadFile(jsonString, `${filename}.json`, false);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}