'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEditorStore } from "@/store/store";
import { FileImage, FileIcon, FileJson, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { exportAsImage, exportAsSvg, exportAsJson } from "@/service/export-service";

function ExportModel({ open, onOpenChange }) {
    const { canvas } = useEditorStore();
    const [selectedFormat, setSelectedFormat] = useState("png");
    const [isExporting, setIsExporting] = useState(false);

    const exportFormats = [
        {
            id: "png",
            name: "PNG Image",
            icon: FileImage,
            description: "Best for web and social media"
        },
        {
            id: "jpg",
            name: "JPG Image",
            icon: FileImage,
            description: "Smaller file size"
        },
        {
            id: "svg",
            name: "SVG Vector",
            icon: FileIcon,
            description: "Scalable vector format"
        },
        {
            id: "json",
            name: "JSON Workspace",
            icon: FileJson,
            description: "Editable backup format"
        }
    ];

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await new Promise(res => setTimeout(res, 100));

            const filename = "Imaginex_Design_" + new Date().getTime();
            let success = false;

            switch (selectedFormat) {
                case "png":
                    success = exportAsImage(canvas, selectedFormat, filename);
                    break;
                case "jpg":
                    success = exportAsImage(canvas, selectedFormat, filename);
                    break;
                case "svg":
                    success = exportAsSvg(canvas, filename);
                    break;
                case "json":
                    success = exportAsJson(canvas, filename);
                    break;
            }

            if (success) {
                onOpenChange(false);
            } else {
                alert("Failed to export design. Please try again.");
            }
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export Design</DialogTitle>
                    <DialogDescription>
                        Choose a format and download your design
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                        {exportFormats.map((format) => (
                            <Button
                                key={format.id}
                                variant={selectedFormat === format.id ? "default" : "outline"}
                                onClick={() => setSelectedFormat(format.id)}
                                className={`flex flex-col items-center justify-center p-6 h-auto ${selectedFormat === format.id ? "border-2 border-primary" : ""
                                    }`}
                            >
                                <format.icon className={`w-8 h-8 mb-2 ${selectedFormat === format.id ? "text-white" : "text-gray-500"}`} />
                                <span className="text-sm font-medium">{format.name}</span>
                                <span className={`text-xs mt-1 font-normal ${selectedFormat === format.id ? "text-white/80" : "text-muted-foreground"}`}>
                                    {format.description}
                                </span>
                            </Button>
                        ))}
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleExport} disabled={isExporting}>
                            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Download
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ExportModel;