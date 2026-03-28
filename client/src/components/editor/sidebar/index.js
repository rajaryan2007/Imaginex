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
    <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-auto h-auto md:h-[calc(100vh-120px)] gap-2 md:gap-3 pointer-events-auto" >
      <aside className="glass-panel w-full md:w-20 rounded-xl md:rounded-2xl flex flex-row md:flex-col items-center py-2 md:py-4 px-2 md:px-0 gap-2 md:gap-3 shadow-xl overflow-x-auto md:overflow-y-auto order-2 md:order-1 no-scrollbar flex-shrink-0 z-50">
        {
          sidebarItems.map(item => (
            <div 
              onClick={() => handleItemClick(item.id)} 
              key={item.id} 
              className={`flex flex-col items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-xl cursor-pointer transition-all duration-200 group shrink-0 ${activeSidebar === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-1 ring-blue-700' : "text-slate-400 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100"}`}
            >
              <item.icon className={`sidebar-item-icon h-5 w-5 md:h-5 md:w-5 stroke-[2.5px] transition-transform group-hover:scale-110 ${activeSidebar === item.id ? 'text-white' : ''}`} />
              <span className={`sidebar-item-label text-[9px] md:text-[10px] font-bold mt-1 uppercase tracking-tight ${activeSidebar === item.id ? 'text-blue-50' : ''}`}>{item.label}</span>
            </div>
          ))
        }
      </aside>
      
      {activeSidebar && (
        <div 
          className={`glass-panel rounded-2xl transition-all duration-300 relative flex flex-col z-10 bg-white order-1 md:order-2 shadow-2xl md:shadow-none 
            ${isPanelColleapsed ? 'hidden md:flex md:w-0' : 'w-full h-[40vh] md:h-full md:w-[320px]'}`}
        >
          <div className={`flex flex-col h-full w-full ${isPanelColleapsed ? 'hidden' : 'flex'}`}>
            <div className="flex items-center p-3 md:p-4 border-b border-slate-200/60" >
              <button className="p-1 mr-2 rounded hover:bg-slate-100 text-slate-700 transition-colors" onClick={closeSecondaryPanel}>
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <span className="font-semibold text-slate-800 text-base md:text-lg">{activeItem?.label}</span>
            </div>
            <div className="flex-1 overflow-y-auto" >{activeItem?.panel()}</div>
          </div>
          
          <button 
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md hover:bg-slate-50 text-slate-600 z-10"
            onClick={togglePanelCollagpse}
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${isPanelColleapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
