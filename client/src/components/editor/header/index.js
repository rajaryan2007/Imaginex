"use client";

import { 
  Undo2, 
  Redo2, 
  Download, 
  Share2, 
  LayoutTemplate,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function Header() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4 shrink-0 z-100">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutTemplate className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Imaginex</span>
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <Button variant="outline" size="sm" className="gap-x-2 font-medium">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-x-2 font-medium">
          <Download className="h-4 w-4" />
          Download
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
