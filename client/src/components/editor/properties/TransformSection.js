import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransformSection({ properties, onChange }) {
    return (
        <>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">X</Label>
                    <Input type="number" value={properties.left}
                        onChange={(e) => onChange('left', e.target.value)}
                        className="font-mono text-xs h-8" />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Y</Label>
                    <Input type="number" value={properties.top}
                        onChange={(e) => onChange('top', e.target.value)}
                        className="font-mono text-xs h-8" />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">W</Label>
                    <Input type="number" value={properties.width}
                        onChange={(e) => onChange('width', e.target.value)}
                        className="font-mono text-xs h-8" />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">H</Label>
                    <Input type="number" value={properties.height}
                        onChange={(e) => onChange('height', e.target.value)}
                        className="font-mono text-xs h-8" />
                </div>
            </div>


            <div className="space-y-1">
                <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Rotation</Label>
                <div className="flex items-center gap-2">
                    <Input type="number" value={properties.angle}
                        onChange={(e) => onChange('angle', e.target.value)}
                        className="flex-1 font-mono text-xs h-8" />
                    <span className="text-xs text-gray-400 font-medium">deg</span>
                </div>
            </div>
        </>
    );
}
