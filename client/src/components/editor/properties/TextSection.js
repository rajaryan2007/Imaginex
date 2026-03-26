import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    Bold, Italic, Underline, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify
} from "lucide-react";

const FONT_FAMILIES = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana',
    'Courier New', 'Impact', 'Comic Sans MS', 'Trebuchet MS',
    'Palatino Linotype', 'Lucida Console', 'Tahoma', 'Garamond',
];

export default function TextSection({ properties, onChange, onTextToggle, onBoolToggle }) {
    return (
        <div className="space-y-4 px-1 py-4">
            <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none block">Typography</Label>


            <div className="space-y-2">
                <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Font Family</Label>
                <select
                    value={properties.fontFamily}
                    onChange={(e) => onChange('fontFamily', e.target.value)}
                    className="w-full h-9 text-xs border border-slate-200 rounded-lg px-2 bg-slate-50/50 focus:bg-white transition-all shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                    {FONT_FAMILIES.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>


            <div className="space-y-2">
                <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Font Size</Label>
                <Input type="number" value={properties.fontSize} min={1} max={500}
                    onChange={(e) => onChange('fontSize', e.target.value)}
                    className="font-mono text-xs h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-none" />
            </div>


            <div className="flex gap-2">
                <Button
                    variant={properties.fontWeight === 'bold' ? 'default' : 'outline'}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm ${properties.fontWeight === 'bold' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onTextToggle('fontWeight', 'bold', 'normal')}
                    title="Bold"
                >
                    <Bold className={`w-4 h-4 ${properties.fontWeight === 'bold' ? 'text-white' : 'text-slate-600'}`} />
                </Button>
                <Button
                    variant={properties.fontStyle === 'italic' ? 'default' : 'outline'}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm ${properties.fontStyle === 'italic' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onTextToggle('fontStyle', 'italic', 'normal')}
                    title="Italic"
                >
                    <Italic className={`w-4 h-4 ${properties.fontStyle === 'italic' ? 'text-white' : 'text-slate-600'}`} />
                </Button>
                <Button
                    variant={properties.underline ? 'default' : 'outline'}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm ${properties.underline ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onBoolToggle('underline')}
                    title="Underline"
                >
                    <Underline className={`w-4 h-4 ${properties.underline ? 'text-white' : 'text-slate-600'}`} />
                </Button>
                <Button
                    variant={properties.linethrough ? 'default' : 'outline'}
                    size="sm" className={`flex-1 h-9 transition-all shadow-sm ${properties.linethrough ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => onBoolToggle('linethrough')}
                    title="Strikethrough"
                >
                    <Strikethrough className={`w-4 h-4 ${properties.linethrough ? 'text-white' : 'text-slate-600'}`} />
                </Button>
            </div>


            <div className="flex gap-2">
                {[
                    { val: 'left', Icon: AlignLeft },
                    { val: 'center', Icon: AlignCenter },
                    { val: 'right', Icon: AlignRight },
                    { val: 'justify', Icon: AlignJustify },
                ].map(({ val, Icon }) => (
                    <Button key={val}
                        variant={properties.textAlign === val ? 'default' : 'outline'}
                        size="sm" className={`flex-1 h-9 transition-all shadow-sm ${properties.textAlign === val ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                        onClick={() => onChange('textAlign', val)}
                        title={`Align ${val}`}
                    >
                        <Icon className={`w-4 h-4 ${properties.textAlign === val ? 'text-white' : 'text-slate-600'}`} />
                    </Button>
                ))}
            </div>


            <div className="space-y-3 py-4 border-y border-slate-100/80">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Line Height</Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{properties.lineHeight}</span>
                </div>
                <Slider min={0.5} max={3} step={0.05}
                    value={[properties.lineHeight]}
                    onValueChange={(vals) => onChange('lineHeight', vals[0])} />
            </div>

            <div className="space-y-3 py-4">
                <div className="flex justify-between items-center">
                    <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Letter Spacing</Label>
                    <span className="text-[11px] font-mono bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-semibold">{properties.charSpacing}</span>
                </div>
                <Slider min={-200} max={800} step={10}
                    value={[properties.charSpacing]}
                    onValueChange={(vals) => onChange('charSpacing', vals[0])} />
            </div>
        </div>
    );
}
