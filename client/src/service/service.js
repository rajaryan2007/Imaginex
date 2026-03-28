import axios from "axios";
import { getSession } from "next-auth/react";


const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:5000";



export async function fetchWithAuth(endpoint, options = {}) {
  const session = await getSession();

  if (!session) {
    throw new Error("not authenticated")
  }

  try {
    const reponse = await axios({
      url: `${API_URL}${endpoint}`,
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        ...options.headers
      },
      data: options.body,
      params: options.params
    })

    return reponse.data;

  } catch (e) {
    console.error("fetchWithAuth error:", e.response?.data || e.message);
    throw new Error(`API request failed: ${e.response?.data?.message || e.message}`)
  }
}