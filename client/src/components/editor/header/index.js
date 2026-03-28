"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/store"

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ExportModel from "../export";

const { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } = require("@/components/ui/dropdown-menu")
const { ChevronDown, Pencil, Eye, Save, LogOut, Star, Download } = require("lucide-react")

function Header() {

  const { isEditing, setIsEditing, name, setName, canvas, markAsModified } = useEditorStore();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    signOut();
  }

  useEffect(() => {
    if (!canvas) return;
    canvas.selection = isEditing;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = isEditing;
      obj.evented = isEditing;
    })
  }, [isEditing, canvas]);

  const handleSaveChangeInCanvas = () => {
    console.log("button is clicked");
    markAsModified();
  }

  const handleDownload = () => {
    setExportOpen(true);
  }

  if (!mounted) {
    return <header className="glass-panel rounded-2xl flex items-center justify-between px-6 h-14" />;
  }

  return <header className="glass-panel flex items-center justify-between px-6 h-14 rounded-2xl w-full mx-auto">
    <div className="flex items-center space-x-2" >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors px-2 py-1 rounded-md hover:bg-slate-100">
            <span>{isEditing ? 'Editing' : 'Viewing'}</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Editing</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsEditing(false)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Viewing</span>
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>
    </div>
    <div>
      <button onClick={handleSaveChangeInCanvas} className="flex items-center justify-center w-8 h-8 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative" title="save" >
        <Save className="w-5 h-5" />
      </button>
    </div>
    <div>
      <button onClick={() => { handleDownload() }} className="flex items-center justify-center w-8 h-8 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative" title="download" >
        <Download className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 flex justify-center max-w-md" >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-100/50 border-transparent focus:bg-white focus:border-blue-500 transition-colors shadow-none"
      />
    </div>
    <div className="flex items-center space-x-3">
      <button className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-full h-9 px-4 transition-colors">
        <Star className="mr-1.5 h-4 w-4 text-orange-400 fill-orange-400" />
        Upgrade Plan
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {session?.user?.name?.[0] || "U"}
              </AvatarFallback>
              <AvatarImage src={session?.user?.image || '/placeholder-user.jpg'} />
            </Avatar>

          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className='w-56'>
          <DropdownMenuItem onClick={handleLogout} className={'cursor-pointer'} >
            <LogOut className="mr-2 w-4 h-4" />
            <span className="font-bold">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
    {exportOpen && (
      <ExportModel open={exportOpen} onOpenChange={setExportOpen} />
    )}
  </header>
}

export default Header;
