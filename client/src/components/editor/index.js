"use client";

import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/store/store";

import { getUserDesignID } from "@/service/design-service";
import { ArrowDown01 } from "lucide-react";

function MainEditor() {
  const params = useParams();
  const router = useRouter();

  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setloadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const { canvas, setDesignId, resetStore } = useEditorStore();

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

    try {
      setIsLoading(true);
      setloadAttempted(true);

      const response = await getUserDesignID(designId);
      const design = response.data;

      if (design) {
        setDesignId(designId);
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

          if (canvasData.background) {
            fabricInstance.backgroundColor = canvasData.background;
          } else {
            fabricInstance.backgroundColor = "#ffffff";
          }

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
          fabricInstance.backgroundColor = "#black";
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
    const init = async () => {
      if (designId && canvas && !loadAttempted) {
        await loadDesign();
      } else if (!designId) {
        router.replace("/");
      }
    };
    init();
  }, [canvas, designId, loadDesign, loadAttempted, router]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
          <div className="w-full h-full bg-white rounded-xl shadow-sm border overflow-hidden flex items-center justify-center">
            <Canvas />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainEditor;
