import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransformSection({ properties, onChange }) {
    return (
        <>

            <div className="grid grid-cols-2 gap-4 px-1 pb-4">
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Position X</Label>
                    <Input type="number" value={properties.left}
                        onChange={(e) => onChange('left', e.target.value)}
                        className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Position Y</Label>
                    <Input type="number" value={properties.top}
                        onChange={(e) => onChange('top', e.target.value)}
                        className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Width</Label>
                    <Input type="number" value={properties.width}
                        onChange={(e) => onChange('width', e.target.value)}
                        className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Height</Label>
                    <Input type="number" value={properties.height}
                        onChange={(e) => onChange('height', e.target.value)}
                        className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
            </div>


            <div className="space-y-2 px-1 pb-4 border-b border-slate-100/80">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Rotation</Label>
                <div className="flex items-center gap-3">
                    <Input type="number" value={properties.angle}
                        onChange={(e) => onChange('angle', e.target.value)}
                        className="flex-1 font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">deg</span>
                </div>
            </div>
        </>
    );
}
