"use client";

import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/store/store";

import { getUserDesignID } from "@/service/design-service";
import { ArrowDown01 } from "lucide-react";
import { centerCanvas } from "@/fabric/fabric-utils";


import Properties from "./properties";

function MainEditor() {
  const params = useParams();
  const router = useRouter();

  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setloadAttempted] = useState(false);
  const [error, setError] = useState(null);
  const { canvas, isEditing, setDesignId, resetStore, setName, showProperties, setShowProperties, markAsModified } = useEditorStore();

  useEffect(() => {
    resetStore();
    if (designId) setDesignId(designId);
    return () => {
      resetStore();
    };
  }, []);

  useEffect(() => {
    setloadAttempted(false);
    setError(null);
  }, [designId]);

  useEffect(() => {
    if (isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (isLoading) {
          console.log("Canvas init timeout");
          setIsLoading(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, canvas, designId]);

  useEffect(() => {
    if (canvas) {
      console.log("Canvas is now avaiable is edition");
    }
  }, [canvas]);

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;


    const fabricInstance = canvas?.current || canvas;


    if (!fabricInstance || typeof fabricInstance.clear !== "function") {
      console.warn("Canvas is not a valid Fabric instance yet, skipping loadDesign");
      return;
    }


    if (!fabricInstance.contextContainer && !fabricInstance.getContext?.()) {
      console.warn("Canvas rendering context is destroyed, skipping loadDesign");
      return;
    }

    try {
      setIsLoading(true);
      setloadAttempted(true);



      const response = await getUserDesignID(designId);
      const design = response.data;

      if (design) {
        setDesignId(designId);
        setName(design.name);
      }
      console.log("Design loaded:", response);

      try {
        if (design.canvasData) {
          fabricInstance.clear();

          if (design.width && design.height) {
            fabricInstance.setDimensions({
              width: design.width,
              height: design.height,
            });
            centerCanvas(fabricInstance);
          }

          const canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;

          const hasObjects = canvasData.objects && canvasData.objects.length > 0;


          const bgColor = canvasData.background || "#ffffff";
          console.log("Setting background to:", bgColor);

          fabricInstance.set("backgroundColor", bgColor);
          fabricInstance.renderAll();


          if (!hasObjects) {
            fabricInstance.renderAll();
            return true;
          }


          try {
            const { util } = await import('fabric');
            const enlivenedObjects = await util.enlivenObjects(canvasData.objects);


            enlivenedObjects.forEach(obj => {
              fabricInstance.add(obj);
            });
          } catch (err) {
            console.error('Error enlivening objects:', err);
          }

          fabricInstance.requestRenderAll();
          fabricInstance.calcOffset();
        } else {
          console.log("No canvas data, initializing empty canvas");

          fabricInstance.clear();
          fabricInstance.setDimensions({
            width: design.width || 800,
            height: design.height || 600
          });
          centerCanvas(fabricInstance);
          fabricInstance.backgroundColor = "#ffffff";
          fabricInstance.renderAll();
          fabricInstance.calcOffset();
        }
      } catch (e) {
        console.error("Error loading canvas data", e);
        setError("Error loading canvas data");
      } finally {
        setIsLoading(false);
      }
    } catch (e) {
      console.error("Failed to load design from API", e);
      setError("Failed to load design");
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (!canvas) return

    const handleSelectionCreated = (e) => {
      const activeObject = canvas.getActiveObject();
      console.log("Active object:", activeObject);
      if (activeObject) {
        setShowProperties(true)
      }
    }

    const handleSelectionCleared = (e) => {
      setShowProperties(false)
    }

    const handleCanvasModified = () => {
      markAsModified();
    }

    canvas.on("selection:created", handleSelectionCreated)
    canvas.on("selection:cleared", handleSelectionCleared)
    canvas.on("object:modified", handleCanvasModified)
    canvas.on("path:created", handleCanvasModified)

    return () => {
      canvas.off("selection:created", handleSelectionCreated)
      canvas.off("selection:cleared", handleSelectionCleared)
      canvas.off("object:modified", handleCanvasModified)
      canvas.off("path:created", handleCanvasModified)
    }
  }, [canvas, markAsModified])

  useEffect(() => {
    const init = async () => {
      if (designId && canvas && !loadAttempted) {
        await loadDesign();
      } else if (!designId) {
        console.warn(" Editor: No Design ID found. Redirecting to home...");
        router.replace("/");
      }
    };
    init();
  }, [canvas, designId, loadDesign, loadAttempted, router]);

  return (
    <div className="h-screen w-screen overflow-hidden relative canvas-grid-light text-slate-800 flex flex-col">
      <main className="absolute inset-0 z-0 flex items-center justify-center p-2 md:p-8 overflow-hidden">
        <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] ring-1 ring-slate-900/5 bg-white relative rounded-sm flex-shrink-0">
          <Canvas />
        </div>
      </main>

      <div className="absolute top-2 md:top-3 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 md:px-0">
        <div className="pointer-events-auto w-full max-w-5xl">
          <Header />
        </div>
      </div>

      {isEditing && (
        <div className={`absolute left-2 right-2 bottom-2 md:right-auto md:left-3 md:top-20 md:bottom-3 z-40 flex flex-col pointer-events-none justify-end md:justify-start transition-opacity ${showProperties ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100 pointer-events-auto'}`}>
          <div className="pointer-events-auto w-full md:w-auto h-auto md:h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {showProperties && isEditing && (
        <div className="absolute left-2 right-2 bottom-2 md:bottom-3 md:left-auto md:right-3 md:top-20 z-40 pointer-events-none flex justify-center md:justify-end animate-in slide-in-from-bottom-5 md:slide-in-from-right-5">
          <div className="pointer-events-auto h-[45vh] md:h-full w-full md:w-auto bg-white rounded-2xl md:bg-transparent shadow-2xl border border-slate-100 md:border-none md:shadow-none overflow-hidden relative">
            <button
              onClick={() => {
                canvas.discardActiveObject();
                canvas.requestRenderAll();
                setShowProperties(false);
              }}
              className="absolute top-4 right-4 z-50 md:hidden bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <Properties />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainEditor;
