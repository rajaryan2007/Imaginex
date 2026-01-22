"use client";

import { 
  LayoutTemplate, 
  Type, 
  Shapes, 
  Image as ImageIcon, 
  Pencil,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutTemplate, label: "Templates", id: "templates" },
  { icon: Shapes, label: "Elements", id: "elements" },
  { icon: Type, label: "Text", id: "text" },
  { icon: ImageIcon, label: "Uploads", id: "uploads" },
  { icon: Pencil, label: "Draw", id: "draw" },
];

function Sidebar() {
  const activeTab = "templates"; // Placeholder for state

  return (
    <aside className="w-[72px] bg-white border-r flex flex-col items-center py-4 gap-y-4 shrink-0 z-90">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            "w-14 h-14 flex flex-col items-center justify-center gap-y-1 rounded-lg transition-colors group",
            activeTab === item.id 
              ? "bg-slate-100 text-indigo-600" 
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 transition-transform group-hover:scale-110",
            activeTab === item.id ? "text-indigo-600" : "text-slate-500"
          )} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
      
      <div className="mt-auto">
        <button className="w-14 h-14 flex flex-col items-center justify-center gap-y-1 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors group">
          <Settings2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
