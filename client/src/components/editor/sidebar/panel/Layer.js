'use client'

import { useEditorStore } from "@/store/store"
import { Eye, EyeOff, Lock, Unlock, Image as ImageIcon, Type, Square, Circle, Triangle, Trash2, ArrowUp, ArrowDown, Layers } from "lucide-react"
import { useEffect, useState } from "react"

function LayerPanel() {
    const { canvas } = useEditorStore();
    const [layers, setLayers] = useState([]);
    const [activeObject, setActiveObject] = useState(null);

    // Sync layers from canvas
    const syncLayers = () => {
        if (!canvas) return;
        // getObjects() returns array from bottom to top. 
        // We often want UI top to bottom, so we reverse it.
        const objects = [...canvas.getObjects()].reverse();
        setLayers(objects);
        setActiveObject(canvas.getActiveObject());
    }

    useEffect(() => {
        if (!canvas) return;

        syncLayers();

        const events = [
            'object:added',
            'object:removed',
            'object:modified',
            'selection:created',
            'selection:updated',
            'selection:cleared'
        ];

        events.forEach(eventName => canvas.on(eventName, syncLayers));

        return () => {
            events.forEach(eventName => canvas.off(eventName, syncLayers));
        }

    }, [canvas])

    const handleSelectLayer = (obj) => {
        if (!canvas) return;
        canvas.discardActiveObject();
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
        setActiveObject(obj);
    }

    const handleToggleVisibility = (e, obj) => {
        e.stopPropagation();
        obj.set('visible', !obj.visible);
        // Deselect if hidden
        if (!obj.visible && canvas.getActiveObject() === obj) {
            canvas.discardActiveObject();
        }
        canvas.requestRenderAll();
        syncLayers();
    }

    const handleToggleLock = (e, obj) => {
        e.stopPropagation();
        const isLocked = obj.lockMovementX; // using lockMovementX as truth source
        
        obj.set({
            lockMovementX: !isLocked,
            lockMovementY: !isLocked,
            lockRotation: !isLocked,
            lockScalingX: !isLocked,
            lockScalingY: !isLocked,
            hasControls: isLocked, // disables resizing dragging
            selectable: isLocked,
            evented: isLocked // disables clicking completely if true
        });
        
        if (!isLocked && canvas.getActiveObject() === obj) {
            canvas.discardActiveObject();
        }
        canvas.requestRenderAll();
        syncLayers();
    }

    const handleDelete = (e, obj) => {
        e.stopPropagation();
        canvas.remove(obj);
        canvas.requestRenderAll();
        syncLayers();
    }

    const handleMoveUp = (e, obj) => {
        e.stopPropagation();
        canvas.bringObjectForward(obj);
        canvas.requestRenderAll();
        syncLayers();
    }

    const handleMoveDown = (e, obj) => {
        e.stopPropagation();
        canvas.sendObjectBackwards(obj);
        canvas.requestRenderAll();
        syncLayers();
    }

    const getIconForType = (type) => {
        switch (type) {
            case 'image': return <ImageIcon className="w-4 h-4 text-blue-500" />;
            case 'textbox':
            case 'i-text':
            case 'text': return <Type className="w-4 h-4 text-orange-500" />;
            case 'rect': return <Square className="w-4 h-4 text-green-500" />;
            case 'circle': return <Circle className="w-4 h-4 text-red-500" />;
            case 'triangle': return <Triangle className="w-4 h-4 text-purple-500" />;
            default: return <Layers className="w-4 h-4 text-gray-500" />;
        }
    }

    const getNameForLayer = (obj) => {
        // Support custom names mapping later
        if (obj.name) return obj.name;
        
        switch (obj.type) {
            case 'image': return 'Image Layer';
            case 'textbox': 
            case 'i-text':
            case 'text': 
                return obj.text ? `Text: ${obj.text.substring(0, 10)}${obj.text.length > 10 ? '...' : ''}` : 'Text Layer';
            case 'rect': return 'Rectangle';
            case 'circle': return 'Circle';
            case 'triangle': return 'Triangle';
            default: return 'Layer';
        }
    }

    return (
        <div className="flex flex-col h-full bg-white w-[280px]">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-gray-500" />
                    Layers
                </h3>
                <p className="text-xs text-gray-500 mt-1">Manage canvas objects stack</p>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                {layers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <Layers className="w-8 h-8 opacity-20 mb-2" />
                        <span className="text-xs">No layers yet</span>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {layers.map((layer, index) => {
                            const isSelected = activeObject === layer;
                            const isLocked = layer.lockMovementX; // if one is locked, we assume locked

                            return (
                                <div 
                                    key={layer.id || index}
                                    onClick={() => !isLocked && handleSelectLayer(layer)}
                                    className={`
                                        flex items-center justify-between p-2 rounded-md cursor-pointer text-sm
                                        transition-colors group
                                        ${isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}
                                        ${isLocked ? 'opacity-60 grayscale cursor-not-allowed' : ''}
                                    `}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <button 
                                            onClick={(e) => handleToggleVisibility(e, layer)}
                                            className="text-gray-400 hover:text-gray-700 p-1 rounded-sm flex-shrink-0"
                                            title={layer.visible !== false ? "Hide Layer" : "Show Layer"}
                                        >
                                            {layer.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        
                                        <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded flex-shrink-0">
                                            {getIconForType(layer.type)}
                                        </div>

                                        <span className={`truncate flex-1 font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                            {getNameForLayer(layer)}
                                        </span>
                                    </div>

                                    {/* Actions shown entirely on hover */}
                                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        
                                        <button 
                                            onClick={(e) => handleToggleLock(e, layer)}
                                            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-sm"
                                            title={isLocked ? "Unlock Layer" : "Lock Layer"}
                                        >
                                            {isLocked ? <Lock className="w-3.5 h-3.5 text-gray-600" /> : <Unlock className="w-3.5 h-3.5" />}
                                        </button>
                                        
                                        <div className="flex flex-col gap-0.5 mx-0.5">
                                            <button 
                                                onClick={(e) => handleMoveUp(e, layer)}
                                                disabled={index === 0}
                                                className={`p-[2px] rounded-sm ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                <ArrowUp className="w-3 h-3" strokeWidth={3} />
                                            </button>
                                            <button 
                                                onClick={(e) => handleMoveDown(e, layer)}
                                                disabled={index === layers.length - 1}
                                                className={`p-[2px] rounded-sm ${index === layers.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                <ArrowDown className="w-3 h-3" strokeWidth={3} />
                                            </button>
                                        </div>

                                        <button 
                                            onClick={(e) => handleDelete(e, layer)}
                                            className="p-1 text-red-400 hover:text-red-700 hover:bg-red-100 rounded-sm"
                                            title="Delete Layer"
                                            disabled={isLocked} // prevent deletion when locked
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LayerPanel