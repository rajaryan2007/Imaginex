import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const formatColorForInput = (colorStr) => {
    if (!colorStr) return '#000000';
    if (typeof colorStr === 'string' && colorStr.startsWith('#')) return colorStr.slice(0, 7); 
    const match = typeof colorStr === 'string' ? colorStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/) : null;
    if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }
    return '#000000'; // Fallback for native color input, which strictly requires hex
}

export default function StyleSection({ properties, onChange, onShadowChange }) {
    return (
        <>

            <div className="space-y-2 px-1 pb-4 border-b border-slate-100/80">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Fill Color</Label>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border-2 border-slate-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        <Input type="color" value={formatColorForInput(properties.fill)}
                            onChange={(e) => onChange('fill', e.target.value)}
                            className="w-[120%] h-[120%] -m-[10%] p-0 border-none cursor-pointer" />
                    </div>
                    <Input type="text" value={properties.fill}
                        onChange={(e) => onChange('fill', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
            </div>


            <div className="space-y-2 px-1 py-4 border-b border-slate-100/80">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Stroke Color</Label>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border-2 border-slate-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        <Input type="color" value={formatColorForInput(properties.stroke)}
                            onChange={(e) => onChange('stroke', e.target.value)}
                            className="w-[120%] h-[120%] -m-[10%] p-0 border-none cursor-pointer" />
                    </div>
                    <Input type="text" value={properties.stroke}
                        onChange={(e) => onChange('stroke', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
            </div>


            <div className="space-y-3 px-1 py-4 border-b border-slate-100/80">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Stroke Width</Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{properties.strokeWidth}px</span>
                </div>
                <Slider min={0} max={50} step={1}
                    value={[properties.strokeWidth]}
                    onValueChange={(vals) => onChange('strokeWidth', vals[0])} />
            </div>

            <div className="space-y-3 px-1 py-4 border-b border-slate-100/80">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Opacity</Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{Math.round(properties.opacity * 100)}%</span>
                </div>
                <Slider min={0} max={1} step={0.01}
                    value={[properties.opacity]}
                    onValueChange={(vals) => onChange('opacity', vals[0])} />
            </div>


            <div className="space-y-4 px-1 py-4">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Shadow Effect</Label>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border-2 border-slate-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        <Input type="color" value={formatColorForInput(properties.shadowColor)}
                            onChange={(e) => onShadowChange('shadowColor', e.target.value)}
                            className="w-[120%] h-[120%] -m-[10%] p-0 border-none cursor-pointer" />
                    </div>
                    <Input type="text" value={properties.shadowColor}
                        onChange={(e) => onShadowChange('shadowColor', e.target.value)}
                        className="flex-1 font-mono text-xs uppercase h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Blur Amount</Label>
                        <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{properties.shadowBlur}</span>
                    </div>
                    <Slider min={0} max={100} step={1}
                        value={[properties.shadowBlur]}
                        onValueChange={(vals) => onShadowChange('shadowBlur', vals[0])} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Offset X</Label>
                        <Input type="number" value={properties.shadowOffsetX}
                            onChange={(e) => onShadowChange('shadowOffsetX', e.target.value)}
                            className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Offset Y</Label>
                        <Input type="number" value={properties.shadowOffsetY}
                            onChange={(e) => onShadowChange('shadowOffsetY', e.target.value)}
                            className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
                    </div>
                </div>
            </div>
        </>
    );
}
