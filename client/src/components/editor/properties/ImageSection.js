import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sun, Contrast, Droplets, Image as ImageIcon, Wand2 } from "lucide-react";

export default function ImageSection({ filters, onChange }) {
    if (!filters) return null;

    return (
        <div className="space-y-4 py-3 border-y border-gray-100">
            <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Image Filters</Label>


            <div className="flex gap-2">
                <Button
                    variant={filters.grayscale ? "default" : "outline"}
                    size="sm" className="flex-1 h-8 text-xs gap-1"
                    onClick={() => onChange('grayscale', !filters.grayscale)}
                >
                    <ImageIcon className="w-3.5 h-3.5" /> B&W
                </Button>
                <Button
                    variant={filters.invert ? "default" : "outline"}
                    size="sm" className="flex-1 h-8 text-xs gap-1"
                    onClick={() => onChange('invert', !filters.invert)}
                >
                    <Wand2 className="w-3.5 h-3.5" /> Invert
                </Button>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Sun className="w-3 h-3" /> Brightness
                    </Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                        {Math.round(filters.brightness * 100)}%
                    </span>
                </div>
                <Slider min={-1} max={1} step={0.05}
                    value={[filters.brightness]}
                    onValueChange={(vals) => onChange('brightness', vals[0])} />
            </div>


            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Contrast className="w-3 h-3" /> Contrast
                    </Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                        {Math.round(filters.contrast * 100)}%
                    </span>
                </div>
                <Slider min={-1} max={1} step={0.05}
                    value={[filters.contrast]}
                    onValueChange={(vals) => onChange('contrast', vals[0])} />
            </div>


            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Droplets className="w-3 h-3" /> Blur
                    </Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                        {Math.round(filters.blur * 100)}%
                    </span>
                </div>
                <Slider min={0} max={1} step={0.02}
                    value={[filters.blur]}
                    onValueChange={(vals) => onChange('blur', vals[0])} />
            </div>

        </div>
    );
}
