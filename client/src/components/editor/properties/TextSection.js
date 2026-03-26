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
        <div className="space-y-4 py-3 border-y border-gray-100">
            <Label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Typography</Label>


            <div className="space-y-1">
                <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Font Family</Label>
                <select
                    value={properties.fontFamily}
                    onChange={(e) => onChange('fontFamily', e.target.value)}
                    className="w-full h-8 text-xs border border-gray-200 rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {FONT_FAMILIES.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>


            <div className="space-y-1">
                <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Font Size</Label>
                <Input type="number" value={properties.fontSize} min={1} max={500}
                    onChange={(e) => onChange('fontSize', e.target.value)}
                    className="font-mono text-xs h-8" />
            </div>


            <div className="flex gap-1">
                <Button
                    variant={properties.fontWeight === 'bold' ? 'default' : 'outline'}
                    size="sm" className="flex-1 h-8"
                    onClick={() => onTextToggle('fontWeight', 'bold', 'normal')}
                    title="Bold"
                >
                    <Bold className={`w-3.5 h-3.5 ${properties.fontWeight === 'bold' ? 'text-white' : 'text-gray-600'}`} />
                </Button>
                <Button
                    variant={properties.fontStyle === 'italic' ? 'default' : 'outline'}
                    size="sm" className="flex-1 h-8"
                    onClick={() => onTextToggle('fontStyle', 'italic', 'normal')}
                    title="Italic"
                >
                    <Italic className={`w-3.5 h-3.5 ${properties.fontStyle === 'italic' ? 'text-white' : 'text-gray-600'}`} />
                </Button>
                <Button
                    variant={properties.underline ? 'default' : 'outline'}
                    size="sm" className="flex-1 h-8"
                    onClick={() => onBoolToggle('underline')}
                    title="Underline"
                >
                    <Underline className={`w-3.5 h-3.5 ${properties.underline ? 'text-white' : 'text-gray-600'}`} />
                </Button>
                <Button
                    variant={properties.linethrough ? 'default' : 'outline'}
                    size="sm" className="flex-1 h-8"
                    onClick={() => onBoolToggle('linethrough')}
                    title="Strikethrough"
                >
                    <Strikethrough className={`w-3.5 h-3.5 ${properties.linethrough ? 'text-white' : 'text-gray-600'}`} />
                </Button>
            </div>


            <div className="flex gap-1">
                {[
                    { val: 'left', Icon: AlignLeft },
                    { val: 'center', Icon: AlignCenter },
                    { val: 'right', Icon: AlignRight },
                    { val: 'justify', Icon: AlignJustify },
                ].map(({ val, Icon }) => (
                    <Button key={val}
                        variant={properties.textAlign === val ? 'default' : 'outline'}
                        size="sm" className="flex-1 h-8"
                        onClick={() => onChange('textAlign', val)}
                        title={`Align ${val}`}
                    >
                        <Icon className={`w-3.5 h-3.5 ${properties.textAlign === val ? 'text-white' : 'text-gray-600'}`} />
                    </Button>
                ))}
            </div>


            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Line Height</Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{properties.lineHeight}</span>
                </div>
                <Slider min={0.5} max={3} step={0.05}
                    value={[properties.lineHeight]}
                    onValueChange={(vals) => onChange('lineHeight', vals[0])} />
            </div>


            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-gray-400 uppercase tracking-wider">Letter Spacing</Label>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{properties.charSpacing}</span>
                </div>
                <Slider min={-200} max={800} step={10}
                    value={[properties.charSpacing]}
                    onValueChange={(vals) => onChange('charSpacing', vals[0])} />
            </div>
        </div>
    );
}
