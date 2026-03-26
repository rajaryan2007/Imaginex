import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sun, Contrast, Droplets, Image as ImageIcon, Wand2 } from "lucide-react";

export default function ImageSection({ filters, onChange }) {
    if (!filters) return null;

    return (
        <div className="space-y-4 px-1 py-4">
            <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Image Filters</Label>


            <div className="flex gap-2">
                <Button
                    variant={filters.grayscale ? "default" : "outline"}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm gap-2 ${filters.grayscale ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onChange('grayscale', !filters.grayscale)}
                >
                    <ImageIcon className={`w-4 h-4 ${filters.grayscale ? 'text-white' : 'text-slate-600'}`} />
                    <span className="text-xs font-medium">B&W</span>
                </Button>
                <Button
                    variant={filters.invert ? "default" : "outline"}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm gap-2 ${filters.invert ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onChange('invert', !filters.invert)}
                >
                    <Wand2 className={`w-4 h-4 ${filters.invert ? 'text-white' : 'text-slate-600'}`} />
                    <span className="text-xs font-medium">Invert</span>
                </Button>
            </div>

            <div className="space-y-3 py-4 border-y border-slate-100/80">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 leading-none">
                        <Sun className="w-4 h-4 text-slate-400" /> Brightness
                    </Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">
                        {Math.round(filters.brightness * 100)}%
                    </span>
                </div>
                <Slider min={-1} max={1} step={0.05}
                    value={[filters.brightness]}
                    onValueChange={(vals) => onChange('brightness', vals[0])} />
            </div>


            <div className="space-y-3 py-4 border-b border-slate-100/80">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 leading-none">
                        <Contrast className="w-4 h-4 text-slate-400" /> Contrast
                    </Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">
                        {Math.round(filters.contrast * 100)}%
                    </span>
                </div>
                <Slider min={-1} max={1} step={0.05}
                    value={[filters.contrast]}
                    onValueChange={(vals) => onChange('contrast', vals[0])} />
            </div>


            <div className="space-y-3 py-4">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 leading-none">
                        <Droplets className="w-4 h-4 text-slate-400" /> Blur
                    </Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">
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
