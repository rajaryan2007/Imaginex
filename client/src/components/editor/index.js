"use client"

import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas"
import Header from "./header";
import Sidebar from "./sidebar";
import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/store/store";

function MainEditor() {

  const params = useParams()
  const router = useRouter()

  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setloadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const { canvas, setDesignId, resetStore } = useEditorStore()

  useEffect(() => {
    resetStore()
    if (designId) setDesignId(designId);
    return () => {
      resetStore();
    }
  }, [])

  useEffect(() => {
    setloadAttempted(false)
    setError(null)
  }, [designId])

  useEffect(() => {
    if (isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (isLoading) {
          console.log('Canvas init timeout');
          setIsLoading(false);
        }
      })
    }
  }, [isLoading, canvas, designId])

  useEffect(() => {
    if (canvas) {
      console.log('Canvas is now avaiable is edition');
    }
  }, [canvas])

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return
    try {
      setIsLoading(true)
      setloadAttempted(true)

      const reponse = await getUserDesignByID(designId)

      console.log(reponse)

    } catch (e) {

    }
  }, [])


  return <div className="flex flex-col h-screen overflow-hidden" >
    <Header />
    <div className="flex flex-1 overflow-hidden" >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 h-full overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
          <Canvas />
        </main>
      </div>
    </div>
  </div>
}

export default MainEditor;
