"use client"
import { Crown, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { saveDesign } from "@/service/design-service";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Banner() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()
  
  const handleCreateNewDesign = async (e) => {
    // 1. Prevent any default form behavior
    e.preventDefault();

    console.log("Button Clicked!"); // If this shows, the button works.

    if (loading) {
      console.log("Still loading, blocking click");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const initialdesignData = {
        name: 'Untitled design - YOUTUBE Thumbnail',
        canvasData: null,
        width: 825,
        height: 465,
        category: "youtube_thumbnail"
      };

      console.log("Sending data to service...", initialdesignData);
      const newDesign = await saveDesign(initialdesignData);

      console.log("=== API RESPONSE DEBUG ===");
      console.log("Full response:", JSON.stringify(newDesign, null, 2));
      
      // Try to extract ID from various possible response structures
      const designId = newDesign?.data?._id || newDesign?._id || newDesign?.data?.id || newDesign?.id;
      
      console.log("Extracted Design ID:", designId);
      console.log("Type of designId:", typeof designId);
      
      if (designId) {
        const targetUrl = `/editor/${designId}`;
        console.log(" NAVIGATING TO:", targetUrl);
        
        // Force navigation using multiple methods
        try {
          window.location.href = targetUrl;
        } catch (e) {
          console.error("window.location.href failed:", e);
          window.location.assign(targetUrl);
        }
      } else {
        console.error("No design ID found in response!");
        console.error("Response keys:", Object.keys(newDesign || {}));
        setLoading(false);
        setError("Failed to create design - no ID returned.");
      }

    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      
      // Check if it's an authentication error
      if (error.message === "not authenticated") {
        console.log("User not authenticated, redirecting to login");
        setError("Please log in to continue");
        // Redirect to login page - middleware will handle the callback
        router.push("/login");
      } else {
        setError(error.message || "An error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="rounded-xl overflow-hidden bg-linear-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6 md:p-8 text-center" >
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2j sm:mb-4" >
        <Crown className="h-8 w-8 sm:h-10 sm:w-10 md:w-12 text-yellow-400 leading-right" />
        <span className="sm:ml text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium lead" > Create Innovation Design</span>
      </div>
      <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto" >Design eye-catching thumbnails that get mores views</h2>
      <Button 
        onClick={handleCreateNewDesign} 
        disabled={loading}
        className="text-[#8b3dff] bg-white hover:bg-grey-100 rounded-lg px-4 py-4 sm:px-6 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed" 
      >
        {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
        {loading ? "Creating..." : "Start Design"}
      </Button>
      {error && (
        <p className="mt-4 text-red-200 text-sm bg-red-500/20 px-4 py-2 rounded-lg max-w-md mx-auto">
          {error}
        </p>
      )}
    </div>
  );
}

export default Banner

