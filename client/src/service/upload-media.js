import { method } from "lodash";
import { getSession } from "next-auth/react";

const API_URL = "http://localhost:5000/v1/media";

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
                "Authorization": `Bearer ${session.idToken}`
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

export async function generateImageFromAI(prompt) {
    const session = await getSession();
    if (!session) {
        throw new Error("No session found");
    }

    try {
        const response = await fetch(`${API_URL}/generateImage`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.idToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });
        console.log("[AI Gen] Prompt sent:", prompt);
        console.log("[AI Gen] Response status:", response.status);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("[AI Gen] Error response body:", errorBody);
            throw new Error(`Failed to generate image (${response.status}): ${errorBody}`);
        }

        return response.json();
    } catch (e) {
        throw new Error(e.message || "Failed to generate image from AI");
    }
}