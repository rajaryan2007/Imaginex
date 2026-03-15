import { getSession } from "./auth-service";

const API_URL = "http://localhost:5000/api/media";

export async function uploadFileWithAuth(file, metaData = {}) {
    const session = await getSession();
    if (!session) {
        throw new Error("No session found");
    }
    const formData = new FormData();
    formData.append("file", file);

    Object.entries(metaData).forEach(([keyBy, value]) => {
        formData.append(keyBy, value)
    })

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
        if (!response.ok) {
            throw new Error("Upload Failed")
        }
        return response.json();
    } catch (e) {
        throw new Error("Upload Failed")
    }
}

