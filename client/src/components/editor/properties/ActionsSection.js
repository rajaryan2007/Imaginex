import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    ArrowUpToLine, ArrowDownToLine, ChevronUp, ChevronDown,
    FlipHorizontal, FlipVertical, Copy, Trash2, BoxSelect
} from "lucide-react";

export default function ActionsSection({ properties, onLayerAction, onFlip, onDuplicate, onDelete, onCornerRadius, isRect }) {
    return (
        <>

            {isRect && (
                <div className="space-y-3 py-4 border-y border-slate-100/80">
                    <div className="flex justify-between items-center px-1">
                        <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                            <BoxSelect className="w-3.5 h-3.5" /> Corner radius
                        </Label>
                        <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{properties.rx}px</span>
                    </div>
                    <div className="px-1">
                        <Slider min={0} max={200} step={1}
                            value={[properties.rx]}
                            onValueChange={(vals) => onCornerRadius(vals[0])} />
                    </div>
                </div>
            )}


            <div className="space-y-3 py-4 border-b border-slate-100/80">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1 leading-none">Layer Arrange</Label>
                <div className="flex justify-between gap-2 px-1">
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-slate-200 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm" onClick={() => onLayerAction('front')} title="Bring to Front">
                        <ArrowUpToLine className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-slate-200 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm" onClick={() => onLayerAction('forward')} title="Bring Forward">
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-slate-200 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm" onClick={() => onLayerAction('backward')} title="Send Backward">
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-slate-200 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm" onClick={() => onLayerAction('back')} title="Send to Back">
                        <ArrowDownToLine className="w-4 h-4 text-slate-600" />
                    </Button>
                </div>
            </div>


            <div className="space-y-3 py-4">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1 leading-none">Actions & Flip</Label>
                <div className="flex justify-between gap-2 px-1">
                    <Button variant={properties.flipX ? "default" : "outline"} size="sm" className={`px-2 flex-1 h-9 transition-all shadow-sm ${properties.flipX ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`} onClick={() => onFlip('flipX')} title="Flip Horizontal">
                        <FlipHorizontal className={`w-4 h-4 ${properties.flipX ? 'text-white' : 'text-slate-600'}`} />
                    </Button>
                    <Button variant={properties.flipY ? "default" : "outline"} size="sm" className={`px-2 flex-1 h-9 transition-all shadow-sm ${properties.flipY ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`} onClick={() => onFlip('flipY')} title="Flip Vertical">
                        <FlipVertical className={`w-4 h-4 ${properties.flipY ? 'text-white' : 'text-slate-600'}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-slate-200 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm" onClick={onDuplicate} title="Duplicate">
                        <Copy className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-9 border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm" onClick={onDelete} title="Delete">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}
