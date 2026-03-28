"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/store"

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ExportModel from "../export";
import Link from "next/link";

const { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } = require("@/components/ui/dropdown-menu")
const { ChevronDown, Pencil, Eye, Save, LogOut, Download, Home } = require("lucide-react")

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

  return <header className="glass-panel flex items-center justify-between px-2 sm:px-4 md:px-6 h-14 rounded-2xl w-full mx-auto gap-2">

    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
      <Link href="/" className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-md text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors" title="Go to Home">
        <Home className="w-4 h-4 md:w-5 md:h-5" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors px-1 sm:px-2 py-1 rounded-md hover:bg-slate-100 text-xs sm:text-sm md:text-base">
            <span className="hidden sm:inline">{isEditing ? 'Editing' : 'Viewing'}</span>
            <span className="sm:hidden">{isEditing ? 'Edit' : 'View'}</span>
            <ChevronDown className="ml-1 h-3 w-3 md:h-4 md:w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Editing</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditing(false)}>
            <Eye className="mr-2 h-4 w-4" />
            <span>Viewing</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center border-l border-slate-200 pl-1 sm:pl-2 md:pl-4">
        <button onClick={handleSaveChangeInCanvas} className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Save changes">
          <Save className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
        <button onClick={handleDownload} className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Download design">
          <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </div>


    <div className="flex-1 flex justify-center max-w-sm px-1 sm:px-2 md:px-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-100 border-transparent hover:bg-slate-200 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-center font-medium text-slate-700 transition-all shadow-none h-8 md:h-9 rounded-md text-xs sm:text-sm md:text-base px-1 sm:px-3"
        placeholder="Name design"
      />
    </div>

    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center rounded-full hover:ring-2 hover:ring-purple-100 transition-all">
            <Avatar className="h-7 w-7 md:h-8 md:w-8">
              <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-[10px] md:text-xs">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
              <AvatarImage src={session?.user?.image || '/placeholder-user.jpg'} />
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
            <LogOut className="mr-2 w-4 h-4" />
            <span className="font-medium">Log out</span>
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
