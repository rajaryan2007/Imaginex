'use client'

import { useEditorStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Shadow, filters } from "fabric";
import TransformSection from "./TransformSection";
import TextSection from "./TextSection";
import ImageSection from "./ImageSection";
import ActionsSection from "./ActionsSection";
import StyleSection from "./StyleSection";

function Properties() {
    const { canvas } = useEditorStore();
    const [selectedObject, setSelectedObject] = useState(null);
    const [objectType, setObjectType] = useState(null);
    const [properties, setProperties] = useState({
        fill: '#000000', stroke: '#000000', strokeWidth: 0, opacity: 1,
        left: 0, top: 0, width: 0, height: 0, angle: 0,
        flipX: false, flipY: false,
        fontFamily: 'Arial', fontSize: 20, fontWeight: 'normal', fontStyle: 'normal',
        underline: false, linethrough: false, textAlign: 'left', lineHeight: 1.16, charSpacing: 0,
        rx: 0, ry: 0,
        shadowColor: '#000000', shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0,
        filters: { brightness: 0, contrast: 0, blur: 0, grayscale: false, invert: false }
    });

    const isTextObject = objectType === 'textbox' || objectType === 'i-text' || objectType === 'text';
    const isRect = objectType === 'rect';

    useEffect(() => {
        if (!canvas) return;

        const updateProperties = () => {
            const obj = canvas.getActiveObject();
            if (obj) {
                setSelectedObject(obj);
                setObjectType(obj.type);
                const shadow = obj.shadow || {};
                setProperties({
                    fill: obj.fill || '#000000', stroke: obj.stroke || '#000000',
                    strokeWidth: obj.strokeWidth || 0, opacity: obj.opacity ?? 1,
                    left: Math.round(obj.left || 0), top: Math.round(obj.top || 0),
                    width: Math.round((obj.width || 0) * (obj.scaleX || 1)),
                    height: Math.round((obj.height || 0) * (obj.scaleY || 1)),
                    angle: Math.round(obj.angle || 0),
                    flipX: obj.flipX || false, flipY: obj.flipY || false,
                    fontFamily: obj.fontFamily || 'Arial', fontSize: obj.fontSize || 20,
                    fontWeight: obj.fontWeight || 'normal', fontStyle: obj.fontStyle || 'normal',
                    underline: obj.underline || false, linethrough: obj.linethrough || false,
                    textAlign: obj.textAlign || 'left', lineHeight: obj.lineHeight ?? 1.16,
                    charSpacing: obj.charSpacing || 0,
                    rx: obj.rx || 0, ry: obj.ry || 0,
                    shadowColor: shadow.color || '#000000', shadowBlur: shadow.blur || 0,
                    shadowOffsetX: shadow.offsetX || 0, shadowOffsetY: shadow.offsetY || 0,
                    filters: obj.type === 'image' ? {
                        brightness: (obj.filters || []).find(f => f.type === 'Brightness')?.brightness || 0,
                        contrast: (obj.filters || []).find(f => f.type === 'Contrast')?.contrast || 0,
                        blur: (obj.filters || []).find(f => f.type === 'Blur')?.blur || 0,
                        grayscale: !!(obj.filters || []).find(f => f.type === 'Grayscale'),
                        invert: !!(obj.filters || []).find(f => f.type === 'Invert')
                    } : { brightness: 0, contrast: 0, blur: 0, grayscale: false, invert: false }
                });
            } else {
                setSelectedObject(null);
                setObjectType(null);
            }
        };

        updateProperties();
        const events = ['selection:created', 'selection:updated', 'selection:cleared', 'object:modified'];
        events.forEach(e => canvas.on(e, updateProperties));
        return () => events.forEach(e => canvas.off(e, updateProperties));
    }, [canvas]);



    const handlePropertyChange = (property, value) => {
        if (!selectedObject || !canvas) return;
        let numValue = parseFloat(value);
        if (isNaN(numValue) && typeof value !== 'string') return;

        if (property === 'width') {
            selectedObject.set('scaleX', numValue / selectedObject.width);
        } else if (property === 'height') {
            selectedObject.set('scaleY', numValue / selectedObject.height);
        } else {
            const stringProps = ['fill', 'stroke', 'fontFamily', 'fontWeight', 'fontStyle', 'textAlign'];
            selectedObject.set(property, stringProps.includes(property) ? value : numValue);
        }
        selectedObject.setCoords();
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, [property]: value }));
    };

    const handleTextToggle = (prop, activeVal, inactiveVal) => {
        if (!selectedObject || !canvas) return;
        const newVal = selectedObject[prop] === activeVal ? inactiveVal : activeVal;
        selectedObject.set(prop, newVal);
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, [prop]: newVal }));
    };

    const handleBoolToggle = (prop) => {
        if (!selectedObject || !canvas) return;
        const newVal = !selectedObject[prop];
        selectedObject.set(prop, newVal);
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, [prop]: newVal }));
    };

    const handleShadowChange = (prop, value) => {
        if (!selectedObject || !canvas) return;
        const old = selectedObject.shadow || {};
        const num = parseFloat(value);
        const newShadow = new Shadow({
            color: prop === 'shadowColor' ? value : (old.color || '#000000'),
            blur: prop === 'shadowBlur' ? (isNaN(num) ? 0 : num) : (old.blur || 0),
            offsetX: prop === 'shadowOffsetX' ? (isNaN(num) ? 0 : num) : (old.offsetX || 0),
            offsetY: prop === 'shadowOffsetY' ? (isNaN(num) ? 0 : num) : (old.offsetY || 0),
        });
        selectedObject.set('shadow', newShadow);
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, [prop]: value }));
    };

    const handleFilterChange = (filterName, value) => {
        if (!selectedObject || selectedObject.type !== 'image') return;

        const newFiltersState = { ...properties.filters, [filterName]: value };
        const activeFilters = [];

        if (newFiltersState.brightness !== 0) {
            activeFilters.push(new filters.Brightness({ brightness: newFiltersState.brightness }));
        }
        if (newFiltersState.contrast !== 0) {
            activeFilters.push(new filters.Contrast({ contrast: newFiltersState.contrast }));
        }
        if (newFiltersState.blur > 0) {
            activeFilters.push(new filters.Blur({ blur: newFiltersState.blur }));
        }
        if (newFiltersState.grayscale) {
            activeFilters.push(new filters.Grayscale());
        }
        if (newFiltersState.invert) {
            activeFilters.push(new filters.Invert());
        }

        selectedObject.filters = activeFilters;
        selectedObject.applyFilters();
        canvas.requestRenderAll();

        setProperties(prev => ({ ...prev, filters: newFiltersState }));
    };

    const handleCornerRadius = (value) => {
        if (!selectedObject || !canvas) return;
        const num = parseFloat(value) || 0;
        selectedObject.set({ rx: num, ry: num });
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, rx: num, ry: num }));
    };

    const handleFlip = (axis) => {
        if (!selectedObject || !canvas) return;
        selectedObject.set(axis, !selectedObject[axis]);
        canvas.requestRenderAll();
        setProperties(prev => ({ ...prev, [axis]: !prev[axis] }));
    };

    const handleDelete = () => {
        if (!selectedObject || !canvas) return;
        canvas.remove(selectedObject);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    };

    const handleDuplicate = () => {
        if (!selectedObject || !canvas) return;
        selectedObject.clone().then((cloned) => {
            cloned.set({ left: selectedObject.left + 20, top: selectedObject.top + 20, evented: true });
            if (cloned.type === 'activeSelection') {
                cloned.canvas = canvas;
                cloned.forEachObject((obj) => canvas.add(obj));
                cloned.setCoords();
            } else {
                canvas.add(cloned);
            }
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
        });
    };

    const handleLayerAction = (action) => {
        if (!selectedObject || !canvas) return;
        const actions = {
            front: () => canvas.bringObjectToFront(selectedObject),
            forward: () => canvas.bringObjectForward(selectedObject),
            backward: () => canvas.sendObjectBackwards(selectedObject),
            back: () => canvas.sendObjectToBack(selectedObject),
        };
        actions[action]?.();
        canvas.requestRenderAll();
    };

    if (!selectedObject) return null;

    return (
        <div className="w-[300px] h-full glass-panel rounded-2xl p-5 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Properties</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">{objectType}</span>
                </div>
            </div>

            <div className="space-y-5 pb-20">
                <TransformSection properties={properties} onChange={handlePropertyChange} />

                {isTextObject && (
                    <TextSection properties={properties} onChange={handlePropertyChange}
                        onTextToggle={handleTextToggle} onBoolToggle={handleBoolToggle} />
                )}

                {objectType === 'image' && (
                    <ImageSection filters={properties.filters} onChange={handleFilterChange} />
                )}

                <ActionsSection properties={properties} onLayerAction={handleLayerAction}
                    onFlip={handleFlip} onDuplicate={handleDuplicate} onDelete={handleDelete}
                    onCornerRadius={handleCornerRadius} isRect={isRect} />

                <StyleSection properties={properties} onChange={handlePropertyChange}
                    onShadowChange={handleShadowChange} />
            </div>
        </div>
    );
}

export default Properties;