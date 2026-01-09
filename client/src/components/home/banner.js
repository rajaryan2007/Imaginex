"use client"
import { Crown, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { saveDesign } from "@/service/design-service";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Banner() {



  const [loading, setLoading] = useState(false);
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
      const initialdesignData = {
        name: 'Untitled design - YOUTUBE Thumbnail',
        canvasData: null,
        width: 825,
        height: 465,
        category: "youtube_thumbnail"
      };

      console.log("Sending data to service...", initialdesignData);
      const newDesign = await saveDesign(initialdesignData);


      if (newDesign?.success) {
        router.push(`/editor/${newDesign?.data?._id}`)

      } else {
        throw new Error("Failed to create new design")
      }
      console.log("Success:", newDesign);

    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="rounded-xl overflow-hidden bg-linear-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6 md:p-8 text-center" >
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2j sm:mb-4" >
        <Crown className="h-8 w-8 sm:h-10 sm:w-10 md:w-12 text-yellow-400 leading-right" />
        <span className="sm:ml text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium lead" > Create Innovation Design</span>
      </div>
      <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto" >Design eye-catching thumbnails that get mores views</h2>
      <Button onClick={handleCreateNewDesign} className="text-[#8b3dff] bg-white hover:bg-grey-100 rounded-lg px-4 py-4 sm:px-6 sm:py-4 " >
        {
          loading && <Loader className="w-4 h-4 " />
        }
        Start Design
      </Button>
    </div>
  );
}

export default Banner

