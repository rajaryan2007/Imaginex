'use client'

import { CreditCard, FolderOpen, Home,  Plus } from "lucide-react";
import Link from "next/link";

function HomeSideBar() {
    return (
        <aside className="w-[72px] bg-[#f8f8c] border-rouded flex-col items-center py-4 fixed left-0 top-0 h-full x-20">
            <div className="flex flex-col items-center" >
                <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-color">
                    <Plus className="w-6 h-" />
                </button>
                <div className="text-xs font-medium text-center mt-1 text-gray-700" >
                    Create
                </div>
            </div>
            <nav className="mt-8 flex flex-col items-center space-y-6 w-full" >
                {
                    [
                        {
                            icon: <Home className="h-6 w-6" />, label: "home", active: true
                        },
                        {

                            icon: <FolderOpen className="h-6 w-6" />, label: "Projects", active: true
                        },
                        {

                            icon: <CreditCard className="h-6 w-6" />, label: "Billing", active: true
                        }
                    ].map((menuItem,index)=>(
                      <div key={index} className="flex flex-col items-center w-full" >
                        <Link href="#"
                        className="w-full flex flex-col items-center py-2 text-gray-600 hover:bg-gray-100 hover:text-purple-500"
                        >
                            <div className="relative" >
                                {menuItem.icon}
                            </div>
                                <span className="text-xs font-medium mt-1">
                                    {menuItem.label}
                                </span>
                        </Link>
                      </div>  
                    ))

                }
            </nav>
        </aside>
    );
}

export default HomeSideBar

