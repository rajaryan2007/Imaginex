



export function exportAsJson(canvas, filename = "Filename") {
    if (!canvas) return

    try {
        const canvasData = canvas.toJSON(["id", "filters"])

        const jsonString = JSON.stringify(canvasData, null, 2);


        const blob = new Blob([jsonString], { type: "application/json" })
        saveAs(canvasJsonBlob, `${filename}.json`)
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = `${filename}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        return true
    } catch (e) {
        return false
    }
}