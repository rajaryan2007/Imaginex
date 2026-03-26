"use client";


import ElementsPanels from "./panel/elements";
import TextPanel from "./panel/text";
import AIPanel from "./panel/AI";
import { useState } from "react";
import DrawPanel from "./panel/draw";
import { ArrowLeft, ChevronLeft, Grid, Layers, Pencil, Settings, Sparkle, Type, Upload } from "lucide-react";
import SettingPanel from "./panel/settings";
import UploadPanel from "./panel/upload";
import LayerPanel from "./panel/Layer";


function Sidebar() {
  const [isPanelColleapsed, setIsPanelCollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const sidebarItems = [
    {
      id: "elements",
      icon: Grid,
      label: "Elements",
      panel: () => <ElementsPanels />
    },
    {
      id: "text",
      icon: Type,
      label: "Text",
      panel: () => <TextPanel />
    },
    {
      id: "uploads",
      icon: Upload,
      label: "Uploads",
      panel: () => <UploadPanel />
    },
    {
      id: "AI",
      icon: Sparkle,
      label: "AI",
      panel: () => <AIPanel />
    },
    {
      id: "draw",
      icon: Pencil,
      label: "Draw",
      panel: () => <DrawPanel />
    },
    {
      id: "setting",
      icon: Settings,
      label: "Setting",
      panel: () => <SettingPanel />
    },
    {
      id: "layer",
      icon: Layers,
      label: "Layer",
      panel: () => <LayerPanel />
    }
  ]

  const handleItemClick = (id) => {
    if (id === activeSidebar && !isPanelColleapsed) return

    setActiveSidebar(id)
    setIsPanelCollapsed(false)
  }

  const closeSecondaryPanel = () => {
    setActiveSidebar(false);
  }

  const togglePanelCollagpse = (e) => {
    e.stopPropagation();
    setIsPanelCollapsed(!isPanelColleapsed)
  }


  const activeItem = sidebarItems.find(items => items.id == activeSidebar)

  return (
    <div className="flex items-start h-[calc(100vh-120px)] gap-3" >
      <aside className="glass-panel w-20 rounded-2xl flex flex-col items-center py-4 gap-3 shadow-xl shadow-slate-200/50">
        {
          sidebarItems.map(item => (
            <div 
              onClick={() => handleItemClick(item.id)} 
              key={item.id} 
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl cursor-pointer transition-all duration-200 group ${activeSidebar === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-1 ring-blue-700' : "text-slate-400 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100"}`}
            >
              <item.icon className={`sidebar-item-icon h-5 w-5 stroke-[2.5px] transition-transform group-hover:scale-110 ${activeSidebar === item.id ? 'text-white' : ''}`} />
              <span className={`sidebar-item-label text-[10px] font-bold mt-1 uppercase tracking-tight ${activeSidebar === item.id ? 'text-blue-50' : ''}`}>{item.label}</span>
            </div>
          ))
        }
      </aside>
      {
        activeSidebar && <div className={`glass-panel rounded-2xl transition-all duration-300 relative h-full flex flex-col z-10`}
          style={{
            width: isPanelColleapsed ? '0' : "320px",
            opacity: isPanelColleapsed ? 0 : 1,
            overflow: isPanelColleapsed ? 'hidden' : 'visible'
          }}
        >
          <div className="flex items-center p-4 border-b border-slate-200/60" >
            <button className="p-1 mr-2 rounded hover:bg-slate-100 text-slate-700 transition-colors" onClick={closeSecondaryPanel}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="font-semibold text-slate-800 text-lg">{activeItem?.label}</span>
          </div>
          <div className="flex-1 overflow-y-auto" >{activeItem?.panel()}</div>
          <button className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 text-slate-600 z-10"
            onClick={togglePanelCollagpse}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      }
    </div>
  );
}

export default Sidebar;
