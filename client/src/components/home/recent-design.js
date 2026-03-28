"use client"

import { getUserDesign, deleteDesign } from "@/service/design-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DesingPreview from "./design-previews";
import { FileImage, Trash2 } from "lucide-react";

function RecentDesign() {
  const [userDesigns, setUserDesigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  async function fetchUserDesigns() {
    try {
      setIsLoading(true)
      const result = await getUserDesign()
      console.log(result, "result");
      setUserDesigns(result?.data || [])
    } catch (error) {
      console.error("Failed to fetch designs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDesigns()
  }, [])

  const handleDelete = async (e, designId) => {
    e.stopPropagation(); // Don't navigate to the editor
    if (!confirm("Are you sure you want to delete this design?")) return;

    try {
      await deleteDesign(designId);
      setUserDesigns(prev => prev.filter(d => d._id !== designId));
    } catch (error) {
      console.error("Failed to delete design:", error);
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Design</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array(5).fill(null).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (userDesigns.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Design</h2>
        <p className="text-gray-500 text-sm">No designs yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Design</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {userDesigns.map((design) => (
          <div
            onClick={() => router.push(`/editor/${design._id}`)}
            key={design._id}
            className="group cursor-pointer relative"
          >
            <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-all duration-300 ease-in-out transform group-hover:scale-105 flex items-center justify-center relative">
              {design?.canvasData ? (
                <DesingPreview design={design} />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                  <FileImage className="w-8 h-8" />
                  <span className="text-xs">{design.width}x{design.height}</span>
                </div>
              )}
              {/* Delete button — appears on hover */}
              <button
                onClick={(e) => handleDelete(e, design._id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10"
                title="Delete design"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="font-bold text-sm truncate">{design.name || 'Untitled Design'}</p>
            <p className="text-xs text-gray-400 truncate">{design.category || 'YOUTUBE Thumbnail'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDesign;
