'use client'

const { Dialog, DialogHeader } = require("@/components/ui/dialog")
const { useEditorStore } = require("@/store/store");
const { DialogContent } = require("@radix-ui/react-dialog");
const { Figma } = require("lucide-react");
const { useState } = require("react");

function ExportModel() {
    const { canvas } = useEditorStore();
    const [SelectedFormat, setSelectedFormat] = useState("png");
    const [isExporting, setIsExporting] = useState(false)

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
            description: "Best for web and social media"
        },
        {
            id: "svg",
            name: "SVG Image",
            icon: FileIcon,
            description: "scaleble vector format"
        },
        {
            id: "pdf",
            name: "PDF Document",
            icon: FileList,
            description: "Best for print and documents"
        },
        {
            id: "json",
            name: "JSON",
            icon: FileJson,
            description: "edit able template format"
        }

    ]
    if (isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className={'sm"max-x-md'} >
                <DialogHeader>
                    <DialogTitle>Export Design</DialogTitle>
                    <DialogDescription>
                        Choose a format and export your design
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {exportFormats.map((format) => (
                            <Button
                                key={format.id}
                                variant={SelectedFormat === format.id ? "default" : "outline"}
                                onClick={() => setSelectedFormat(format.id)}
                                className="flex flex-col items-center justify-center h-24"
                            >
                                <format.icon className="w-6 h-6 mb-2" />
                                <span className="text-sm font-medium">{format.name}</span>
                                <span className="text-xs text-muted-foreground">{format.description}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}