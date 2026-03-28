'use client'
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/store"
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/service/service";
import { useCallback, useEffect, useState } from "react"
import { uploadFileWithAuth } from "@/service/upload-media";
import { addImageToCanvas } from "@/fabric/fabric-utils";

function UploadPanel() {
  const { canvas, markAsModified } = useEditorStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);

  const { data: session, status } = useSession();




  const fetchUserUploads = useCallback(async () => {
    if (status !== 'authenticated' || !session?.idToken) return;
    try {
      setIsLoading(true);
      const res = await fetchWithAuth('/v1/media/get')
      console.log(res);
      setUserUploads(res?.media || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.idToken, status])

  useEffect(() => {
    if (status === "authenticated") fetchUserUploads();
  }, [status, fetchUserUploads])

  const handleFileUpload = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const result = await uploadFileWithAuth(file);
      setUserUploads((prev) => [result.media, ...prev]);
      
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  }
  
  const handleAddImage = (ImageUrl) =>{
    addImageToCanvas(canvas,ImageUrl);
    markAsModified();
  }
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <Label className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer 
            h-12 font-medium transition-all ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            <Upload className="w-5 h-5" />
            <span>{isUploading ? "Uploading..." : "Uploads"}</span>
            <Input type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
          </Label>
        </div>
        <div className="mt5" >
        <h4 className="text-sm font-medium text-grey-800 mb-2">
          Your Uploads
        </h4>
        {
          isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>): (
              <div className="space-y-2">
                {
                  userUploads.length > 0 ? (
                    userUploads.map((upload) => (
                      <div className="flex items-center justify-between" key={upload._id}>
                        <div className="flex items-center gap-2">
                          <img src={upload.url} className="w-10 h-10 object-cover rounded-md" />
                            
                        </div>  
                        <button
                         onClick={()=>handleAddImage(upload.url)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md">Select</button>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-32">
                      <span className="text-gray-500">No uploads found</span>
                    </div>
                  )
                }
              </div>  
            )
              
            
        }
        </div>
      </div>
    </div>
  )

}

export default UploadPanel;
