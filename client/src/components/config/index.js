import { 
    Youtube, 
    Palette, 
    Sticker, 
    Heart, 
    Monitor, 
    FileText, 
    Instagram, 
    Smartphone, 
    Presentation, 
    Layers, 
    Image as ImageIcon, 
    Mail 
} from "lucide-react";

export const DesignTypes = [
    {
        icon: <Presentation className="h-6 w-6 text-white" />,
        label: "Presentation",
        bgColor: "bg-blue-500"
    },
    {
        icon: <Instagram className="h-6 w-6 text-white" />,
        label: "Instagram Post",
        bgColor: "bg-pink-500"
    },
    {
        icon: <Youtube className="h-6 w-6 text-white" />,
        label: "YouTube Thumbnail",
        bgColor: "bg-red-600"
    },
    {
        icon: <FileText className="h-6 w-6 text-white" />,
        label: "Resume / Docs",
        bgColor: "bg-blue-400"
    },
    {
        icon: <Smartphone className="h-6 w-6 text-white" />,
        label: "Mobile Video",
        bgColor: "bg-teal-500"
    },
    {
        icon: <Palette className="h-6 w-6 text-white" />,
        label: "Logo Design",
        bgColor: "bg-purple-500"
    },
    {
        icon: <Mail className="h-6 w-6 text-white" />,
        label: "Email Header",
        bgColor: "bg-orange-500"
    },
    {
        icon: <Sticker className="h-6 w-6 text-white" />,
        label: "Stickers",
        bgColor: "bg-yellow-500"
    },
    {
        icon: <Monitor className="h-6 w-6 text-white" />,
        label: "Desktop Wallpaper",
        bgColor: "bg-indigo-500"
    },
    {
        icon: <ImageIcon className="h-6 w-6 text-white" />,
        label: "Photo Collage",
        bgColor: "bg-green-500"
    }
];