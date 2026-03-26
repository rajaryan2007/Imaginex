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
                <div className="space-y-1 py-3 border-y border-gray-100">
                    <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                            <BoxSelect className="w-3 h-3" /> Corner Radius
                        </Label>
                        <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{properties.rx} px</span>
                    </div>
                    <Slider min={0} max={200} step={1}
                        value={[properties.rx]}
                        onValueChange={(vals) => onCornerRadius(vals[0])} />
                </div>
            )}


            <div className="space-y-2 py-2 border-y border-gray-100">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Layer Arrange</Label>
                <div className="flex justify-between gap-1.5">
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8" onClick={() => onLayerAction('front')} title="Bring to Front">
                        <ArrowUpToLine className="w-3.5 h-3.5 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8" onClick={() => onLayerAction('forward')} title="Bring Forward">
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8" onClick={() => onLayerAction('backward')} title="Send Backward">
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8" onClick={() => onLayerAction('back')} title="Send to Back">
                        <ArrowDownToLine className="w-3.5 h-3.5 text-gray-600" />
                    </Button>
                </div>
            </div>


            <div className="space-y-2 pb-2 border-b border-gray-100">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Actions & Flip</Label>
                <div className="flex justify-between gap-1.5">
                    <Button variant={properties.flipX ? "default" : "outline"} size="sm" className="px-2 flex-1 h-8" onClick={() => onFlip('flipX')} title="Flip Horizontal">
                        <FlipHorizontal className={`w-3.5 h-3.5 ${properties.flipX ? 'text-white' : 'text-gray-600'}`} />
                    </Button>
                    <Button variant={properties.flipY ? "default" : "outline"} size="sm" className="px-2 flex-1 h-8" onClick={() => onFlip('flipY')} title="Flip Vertical">
                        <FlipVertical className={`w-3.5 h-3.5 ${properties.flipY ? 'text-white' : 'text-gray-600'}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8" onClick={onDuplicate} title="Duplicate">
                        <Copy className="w-3.5 h-3.5 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 flex-1 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={onDelete} title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </>
    );
}
