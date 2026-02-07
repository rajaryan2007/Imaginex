"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/store/store";

import {
  BrushIcon,
  EraserIcon,
  Minus,
  Palette,
  PencilIcon,
  Plus,
} from "lucide-react";
import { useState } from "react";

const drawingPanelColorPresets = [
  // --- Essentials & Grays ---
  { id: "c1", color: "#000000", label: "Black" },
  { id: "c2", color: "#4B5563", label: "Gray" },
  { id: "c3", color: "#9CA3AF", label: "Silver" },
  { id: "c4", color: "#E5E7EB", label: "Platinum" },
  { id: "c5", color: "#FFFFFF", label: "White" },

  // --- High Contrast / Vibrant ---
  { id: "c6", color: "#EF4444", label: "Red" },
  { id: "c7", color: "#F97316", label: "Orange" },
  { id: "c8", color: "#F59E0B", label: "Amber" },
  { id: "c9", color: "#EAB308", label: "Yellow" },
  { id: "c10", color: "#84CC16", label: "Lime" },
  { id: "c11", color: "#22C55E", label: "Green" },
  { id: "c12", color: "#10B981", label: "Emerald" },
  { id: "c13", color: "#06B6D4", label: "Cyan" },
  { id: "c14", color: "#3B82F6", label: "Blue" },
  { id: "c15", color: "#6366F1", label: "Indigo" },
  { id: "c16", color: "#8B5CF6", label: "Violet" },
  { id: "c17", color: "#A855F7", label: "Purple" },
  { id: "c18", color: "#D946EF", label: "Fuchsia" },
  { id: "c19", color: "#EC4899", label: "Pink" },
  { id: "c20", color: "#F43F5E", label: "Rose" },

  // --- Soft Pastels ---
  { id: "c21", color: "#FECACA", label: "Soft Red" },
  { id: "c22", color: "#FFEDD5", label: "Soft Orange" },
  { id: "c23", color: "#FEF9C3", label: "Soft Yellow" },
  { id: "c24", color: "#DCFCE7", label: "Soft Green" },
  { id: "c25", color: "#DBEAFE", label: "Soft Blue" },
  { id: "c26", color: "#F3E8FF", label: "Soft Purple" },

  // --- Earthy / Deep Tones ---
  { id: "c27", color: "#451A03", label: "Deep Brown" },
  { id: "c28", color: "#78350F", label: "Amber Brown" },
  { id: "c29", color: "#064E3B", label: "Forest" },
  { id: "c30", color: "#1E3A8A", label: "Navy" },
];

const brushSize = [
  { id: "b1", value: 5, label: "Small" },
  { id: "b2", value: 10, label: "Medium" },
  { id: "b3", value: 15, label: "Large" },
  { id: "b4", value: 20, label: "Extra Large" },
];

function DrawPanel() {
  const { canvas } = useEditorStore();

  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(5);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [drawingOpacity, setDrawingOpacity] = useState(1);
  const [activeTab, setActiveTab] = useState("pencil");
  const [drawingColor, setDrawingColor] = useState("#000000");

  const handleToggleDrawingMode = () => {
    const newMode = !isDrawingMode;
    setIsDrawingMode(newMode);

    if (newMode && isErasing) {
      setIsEraserMode(false);
    }
  };

  const handleDrawColorChange = (color) => {
    setDrawingColor(color);
  };

  return (
    <div className="p-4">
      <div className="space-y-5">
        <Button
          variant={isDrawingMode ? "default" : "outline"}
          className={"w-full py-6 group transition-all "}
          size={"lg"}
          onClick={handleToggleDrawingMode}
        >
          <PencilIcon
            className={`w-6 h-6 group-hover:scale-110 ${isDrawingMode ? "text-white" : "text-gray-600"} transition-transform`}
          />
          <span
            className={`font-medium ${isDrawingMode ? "text-white" : "text-gray-600"} transition-colors`}
          >
            {isDrawingMode ? "Exit Drawing Mode" : "Enter Drawing Mode"}
          </span>
        </Button>
        {
          <Tabs defaultValue="color" className="w-full">
            <TabsList className="grid grid-cols-3 w-full h-auto p-1 bg-gray-100/80">
              <TabsTrigger
                value="color"
                className="flex flex-col gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                //onClick={}
              >
                <Palette className="w-5 h-5" />
                <span className="text-xs font-medium">Color</span>
              </TabsTrigger>

              <TabsTrigger
                value="brush"
                className="flex flex-col gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <BrushIcon className="w-5 h-5" />
                <span className="text-xs font-medium">Brush</span>
              </TabsTrigger>

              <TabsTrigger
                value="eraser"
                className="flex flex-col gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <EraserIcon className="w-5 h-5" />
                <span className="text-xs font-medium">Eraser</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="color">
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Color Palette</Label>
                  <div
                    className="w-6 h-6 rounded-full border shadow-sm transition-colors"
                    style={{ backgroundColor: drawingColor }}
                  />
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {drawingPanelColorPresets.map((preset) => (
                    <button
                      key={preset.id}
                      className={`w-8 h-8 rounded-full border cursor-pointer transition-all 
            hover:scale-110 active:scale-95 ${
              drawingColor === preset.color
                ? "ring-2 ring-offset-2 ring-purple-600"
                : "border-gray-200"
            }`}
                      style={{ backgroundColor: preset.color }}
                      onClick={() => {
                        setDrawingColor(preset.color);
                        if (canvas)
                          canvas.freeDrawingBrush.color = preset.color;
                      }}
                      title={preset.label}
                    />
                  ))}
                </div>
                <div className="flex mt-5 space-x-2">
                  <div className="relative">
                    <Input
                      type="color"
                      value={drawingColor}
                      onChange={(e) => {
                        handleDrawColorChange(e.target.value);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isEraserMode}
                    />
                    <div
                      className="w-12 h-10 rounded-full border shadow-sm transition-colors"
                      style={{ backgroundColor: drawingColor }}
                    />
                  </div>
                  <Input
                    type="text"
                    value={drawingColor}
                    onChange={(e) => {
                      handleDrawColorChange(e.target.value);
                    }}
                    className="w-full h-10"
                    disabled={isEraserMode}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="brush" className="space-y-4">
              <div className="space-y-3">
                <Label className={"block text-sm font-semibold"}>
                  Brush Size
                </Label>
                <div className="flex items-center gap-3">
                  <Minus className="w-5 h-5 text-gray-500`" />
                  <Slider
                    value={[brushWidth]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => {
                      setBrushWidth(value);
                    }}
                    className="w-full flex h-10"
                  />
                  <Plus className="w-5 h-5 text-gray-500`" />
                  <span className="text-sm font-medium">{brushWidth}</span>
                </div>
                <div className="grid grid-cols-5 gap-3 ">
                  {brushSize.map((size) => (
                    <Button className="w-10 h-10  rounded-full border shadow-sm transition-colors"
                    onClick={()=>{setBrushWidth(size.value)}}
                    key={size.value}>{size.value}</Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="eraser"></TabsContent>
          </Tabs>
        }
      </div>
    </div>
  );
}

export default DrawPanel;
