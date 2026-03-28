'use client'

import { Button } from "@/components/ui/button";
import { addTextToCanvas } from "@/fabric/fabric-utils";
import { useEditorStore } from "@/store/store";
import { Type } from "lucide-react";

const textPresents = [
  { id: 'h1', fontSize: 24, name: 'Heading 1',fontWeight: 'bold', style: 'text-2xl font-bold', desc: 'Main Title' },
  { id: 'h2', fontSize: 20, name: 'Heading 2',fontWeight: 'bold', style: 'text-xl font-semibold', desc: 'Section Header' },
  { id: 'h3', fontSize: 18, name: 'Heading 3',fontWeight: 'bold', style: 'text-lg font-medium', desc: 'Sub-section' },
  { id: 'p', fontSize: 16, name: 'Body Text',fontWeight: 'bold', style: 'text-base font-normal', desc: 'Standard paragraph' },
  { id: 's', fontSize: 12, name: 'Caption',fontWeight: 'bold', style: 'text-xs uppercase tracking-wider font-light', desc: 'Small details' },
];

function TextPanel() {
  
  const { canvas, markAsModified } = useEditorStore();
 
  const handleAddCustomText = () => {
    if (!canvas) return;
    
    addTextToCanvas(canvas, 'Custom Text' ,{fontSize:24,fontWeight:"bold"});
    markAsModified();
  }

  return <div className="h-full overflow-y-auto " >
    <div className="p-4 space-y-4" >
      <Button onClick={handleAddCustomText} className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors">
          <Type className="mr-2 h-5 w-5" />
          <span className="font-medium" >Add a text box</span>
      </Button>
      <div className="pt-2">
        <h4 className="text-sm font-medium text-grey-800 mb-2">
          Default Text Styles
        </h4>
        <div className="space-y-2">
          {
            textPresents.map((text) => (
              <Button key={text.id} onClick={() => {
                  addTextToCanvas(canvas, "custom text", {fontSize: text.fontSize,fontWeight: text.fontWeight});
                  markAsModified();
                }} className={`w-full py-3 px-4 ${text.style} hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors`}>
                <Type className="mr-2 h-5 w-5" />
                <span className="font-medium" >{text.name}</span>
              </Button>
            ))
          }
        </div>
      </div>
    </div>
  </div>
}

export default TextPanel;
