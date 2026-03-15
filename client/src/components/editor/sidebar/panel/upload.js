'use client'
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/store"
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/service/service";
import { useCallback, useEffect, useState } from "react"

function UploadPanel() {
  const { canvas } = useEditorStore();

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
      setUserUploads(res?.data || []);
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
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
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
      </div>
    </div>
  )

}

export default UploadPanel;
