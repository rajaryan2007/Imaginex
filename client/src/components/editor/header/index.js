"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/store"
import { useSession, signOut } from "next-auth/react";

const { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } = require("@/components/ui/dropdown-menu")
const { ChevronDown, Pencil, Eye, Save, LogOut, Star } = require("lucide-react")

function Header() {

  const { isEditing, setIsEditing, name, setName } = useEditorStore();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  }
  return <header className="header-gradient header flex items-center justify-between px-4 h-14">
    <div className="flex itmes-center space-x-2" >
      <DropdownMenu>
        <DropdownMenuTrigger asChild="true">
          <button className="header-button flex itmes-center text-white">
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
            <Eye className="mr-2 h-2 w-4" />
            <span>Viewing</span>
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>
    </div>
    <div>
      <button className="header-button relative" title="save" >
        <Save className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 flex justify-center max-w-md" >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full"
      />
    </div>
    <div className="flex items-center space-x-3">
      <button className="upgrade-button flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-9 px-3 transition-colors">
        <Star className="mr-1 h-4 w-4 text-yellow-400" />
        Upgrade-your-plan
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild="true">
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
  </header>
}

export default Header;
