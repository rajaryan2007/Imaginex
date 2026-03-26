import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function StyleSection({ properties, onChange, onShadowChange }) {
    return (
        <>

            <div className="space-y-1">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Fill Color</Label>
                <div className="flex items-center gap-2">
                    <Input type="color" value={properties.fill}
                        onChange={(e) => onChange('fill', e.target.value)}
                        className="w-8 h-8 p-0.5 border rounded cursor-pointer" />
                    <Input type="text" value={properties.fill}
                        onChange={(e) => onChange('fill', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-8" />
                </div>
            </div>


            <div className="space-y-1">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stroke Color</Label>
                <div className="flex items-center gap-2">
                    <Input type="color" value={properties.stroke}
                        onChange={(e) => onChange('stroke', e.target.value)}
                        className="w-8 h-8 p-0.5 border rounded cursor-pointer" />
                    <Input type="text" value={properties.stroke}
                        onChange={(e) => onChange('stroke', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-8" />
                </div>
            </div>


            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stroke Width</Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{properties.strokeWidth} px</span>
                </div>
                <Slider min={0} max={50} step={1}
                    value={[properties.strokeWidth]}
                    onValueChange={(vals) => onChange('strokeWidth', vals[0])} />
            </div>

            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Opacity</Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{Math.round(properties.opacity * 100)}%</span>
                </div>
                <Slider min={0} max={1} step={0.01}
                    value={[properties.opacity]}
                    onValueChange={(vals) => onChange('opacity', vals[0])} />
            </div>


            <div className="space-y-3 py-3 border-t border-gray-100">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Shadow</Label>
                <div className="flex items-center gap-2">
                    <Input type="color" value={properties.shadowColor}
                        onChange={(e) => onShadowChange('shadowColor', e.target.value)}
                        className="w-8 h-8 p-0.5 border rounded cursor-pointer" />
                    <Input type="text" value={properties.shadowColor}
                        onChange={(e) => onShadowChange('shadowColor', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-8" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Blur</Label>
                        <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{properties.shadowBlur}</span>
                    </div>
                    <Slider min={0} max={100} step={1}
                        value={[properties.shadowBlur]}
                        onValueChange={(vals) => onShadowChange('shadowBlur', vals[0])} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Offset X</Label>
                        <Input type="number" value={properties.shadowOffsetX}
                            onChange={(e) => onShadowChange('shadowOffsetX', e.target.value)}
                            className="font-mono text-xs h-8" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Offset Y</Label>
                        <Input type="number" value={properties.shadowOffsetY}
                            onChange={(e) => onShadowChange('shadowOffsetY', e.target.value)}
                            className="font-mono text-xs h-8" />
                    </div>
                </div>
            </div>
        </>
    );
}
