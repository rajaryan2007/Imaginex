'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateImageFromAI } from "@/service/upload-media";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "@/store/store";
import { addImageToCanvas } from "@/fabric/fabric-utils";

function AIPanel() {

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  
  const { canvas } = useEditorStore();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const response = await generateImageFromAI(prompt);
      if (response && response.media) {
        setGeneratedImage(response.media);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImageToCanvas = () => {
    if (canvas && generatedImage?.url) {
      addImageToCanvas(canvas, generatedImage.url);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <Wand2 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">AI Image Creation</h3>
        </div>
        
        <div className="space-y">
          <Textarea
            value={prompt}
            onChange={handlePromptChange}
            placeholder="e.g, A cute dog image..."
            className="resize-none min-h-[150px]"
            disabled={isLoading}
          />
        </div>
        
        <Button
          onClick={handleGenerateImage}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </Button>

        {isLoading && (
          <div className="border rounded-md bg-gray-50 p-6 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4" />
            <p className="text-sm text-center text-gray-600">
              Creating your image...
            </p>
          </div>
        )}

        {(!isLoading && generatedImage) && (
          <div className="border rounded-md p-4 space-y-4 bg-gray-50 mt-4">
            <h4 className="font-medium text-sm text-gray-700">Result</h4>
            <img 
              src={generatedImage.url} 
              alt="Generated AI Media" 
              className="w-full h-auto rounded-md shadow-sm border border-gray-200"
            />
            <Button
              onClick={handleAddImageToCanvas}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Add to Canvas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIPanel;
