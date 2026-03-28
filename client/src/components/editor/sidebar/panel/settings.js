'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Example import

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "@/store/store";
import { centerCanvas } from "@/fabric/fabric-utils";

// Define color presets for background selection
const colorPresets = [
  '#ffffff',
  '#f3f4f6',
  '#e5e7eb',
  '#1f2937',
  '#111827',
  '#fef3c7',
  '#fde68a',
  '#fcd34d',
  '#fed7aa',
  '#fdba74',
  '#fecaca',
  '#fca5a5',
  '#f9a8d4',
  '#f0abfc',
  '#e9d5ff',
  '#ddd6fe',
  '#c7d2fe',
  '#a5b4fc',
  '#bfdbfe',
  '#93c5fd',
  '#bae6fd',
  '#a5f3fc',
  '#99f6e4',
  '#a7f3d0',
  '#86efac',
  '#d9f99d',
];

function SettingPanel() {

  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const { canvas, markAsModified } = useEditorStore();

  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value)
  }


  const handleColorPresetApply = (color) => {
    setBackgroundColor(color)
  }


  const handleApplyChanges = () => {
    if (!canvas) return;
    canvas.set('backgroundColor', backgroundColor);
    canvas.renderAll();
    centerCanvas(canvas);
    markAsModified();
  }


  return <div
    className="p-4 space-y-6"
  >
    <div className="flex flex-col items-center space-x-2 mb-4" >
      <Palette className="w-5 h-5 text-purple-600" />
      <h3 className="text-lg font-semibold">
        Choose backGround Color
      </h3>
      <div className="space-y-2" >
        <div className="grid grid-cols-6 gap-2 mb-3" >
          {
            colorPresets.map(color => (
              <Tooltip key={color}>
                <TooltipTrigger asChild >
                  <button style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-md border transition-transform hover:scale-110 ${color === backgroundColor ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    onClick={() => handleColorPresetApply(color)}
                  >
                    {
                      color === backgroundColor &&
                      <Check className="w-4 h-4 text-white mx-auto drop-shadow-md" />
                    }
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color}</p>
                </TooltipContent>
              </Tooltip>
            ))
          }
        </div>
        <div className="flex flex-col mt-3 space-x-2 " >
          <div className="relative">
            <Input
              type="color"
              value={backgroundColor}
              onChange={handleColorChange}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={handleColorChange}
              className="flex-1"
              placeholder="#ffffff"
            />
          </div>
          <Separator className='my-4' />
          <Button className="w-full"
            onClick={handleApplyChanges}
          >Save changes</Button>
        </div>
      </div>
    </div>

  </div>
}

export default SettingPanel;
