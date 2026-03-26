'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateImageFromAI } from "@/service/upload-media";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "@/store/store";
import { addImageToCanvas } from "@/fabric/fabric-utils";

function AIPanel() {

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const RATIOS = [
    { label: 'Square 1:1', value: '1:1', width: 1024, height: 1024 },
    { label: 'Landscape 16:9', value: '16:9', width: 1024, height: 576 },
    { label: 'Portrait 9:16', value: '9:16', width: 576, height: 1024 },
    { label: 'Standard 4:3', value: '4:3', width: 1024, height: 768 },
  ];

  const { canvas } = useEditorStore();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const selectedRatio = RATIOS.find(r => r.value === aspectRatio);
      const response = await generateImageFromAI(prompt, selectedRatio.width, selectedRatio.height);
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
        <div className="flex items-center space-x-2 mb-4 px-1">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Wand2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">AI Creator</h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Powered by Flux AI</p>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block leading-none px-1">Image Prompt</Label>
          <Textarea
            value={prompt}
            onChange={handlePromptChange}
            placeholder="e.g, A futuristic city with flying cars..."
            className="resize-none min-h-[120px] bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block leading-none px-1">Aspect Ratio</Label>
          <div className="grid grid-cols-2 gap-2 px-1">
            {RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setAspectRatio(ratio.value)}
                disabled={isLoading}
                className={`
                  py-2 px-3 text-[11px] font-bold rounded-xl transition-all border
                  ${aspectRatio === ratio.value
                    ? 'bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-100'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {ratio.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerateImage}
          className="w-full py-3 h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-purple-100 font-bold"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating Image...' : <><Wand2 className="w-5 h-5" /> Create Magic</>}
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
          <div className="glass-panel rounded-2xl p-4 space-y-4 bg-slate-50/50 mt-4 border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider px-1">Generated Result</h4>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{aspectRatio}</span>
            </div>
            <img
              src={generatedImage.url}
              alt="Generated AI Media"
              className="w-full h-auto rounded-xl shadow-lg border border-white"
            />
            <Button
              onClick={handleAddImageToCanvas}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-bold shadow-lg shadow-blue-100"
            >
              Add to Workspace
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIPanel;
