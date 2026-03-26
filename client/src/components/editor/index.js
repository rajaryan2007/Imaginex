"use client";

import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/store/store";

import { getUserDesignID } from "@/service/design-service";
import { ArrowDown01 } from "lucide-react";


import Properties from "./properties";

function MainEditor() {
  const params = useParams();
  const router = useRouter();

  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setloadAttempted] = useState(false);
  const [error, setError] = useState(null);
  const { canvas, isEditing, setDesignId, resetStore, setName, showProperties, setShowProperties } = useEditorStore();

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
      }, 5000); // Added a reasonable timeout value
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

    // 1. Extract the actual Fabric instance from the Ref wrapper if needed
    const fabricInstance = canvas?.current || canvas;

    // 2. Check if we have the real instance and it has the required methods
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

          // In Fabric v7, use util.enlivenObjects to deserialize all objects
          try {
            const { util } = await import('fabric');
            const enlivenedObjects = await util.enlivenObjects(canvasData.objects);

            // Add all objects to the canvas
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

    canvas.on("selection:created", handleSelectionCreated)
    canvas.on("selection:cleared", handleSelectionCleared)

    return () => {
      canvas.off("selection:created", handleSelectionCreated)
      canvas.off("selection:cleared", handleSelectionCleared)
    }
  }, [canvas])

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
    <div className="h-screen w-screen overflow-hidden relative canvas-grid-light text-slate-800">
      <main className="absolute inset-0 z-0 flex items-center justify-center overflow-auto p-8">
        <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] ring-1 ring-slate-900/5 bg-white relative rounded-sm">
           <Canvas />
        </div>
      </main>

      <div className="absolute top-3 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl">
          <Header />
        </div>
      </div>

      {isEditing && (
        <div className="absolute left-3 top-20 bottom-3 z-40 flex pointer-events-none">
          <div className="pointer-events-auto">
            <Sidebar />
          </div>
        </div>
      )}

      {showProperties && isEditing && (
        <div className="absolute right-3 top-20 bottom-3 z-40 pointer-events-none">
          <div className="pointer-events-auto h-full">
            <Properties />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainEditor;
