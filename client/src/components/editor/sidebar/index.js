"use client";


import ElementsPanels from "./panel/elements";
import TextPanel from "./panel/text";
import AIPanel from "./panel/AI";
import { useState } from "react";
import DrawPanel from "./panel/draw";
import { ArrowLeft, ChevronLeft, Grid, Pencil, Settings, Sparkle, Type, Upload } from "lucide-react";
import SettingPanel from "./panel/settings";
import UploadPanel from "./panel/upload";


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
    <div className="flex h-full" >
      <aside className="sidebar">
        {
          sidebarItems.map(item => (
            <div onClick={() => handleItemClick(item.id)} key={item.id} className={`sidebar-item ${activeSidebar === item.id ? 'active' : ""}`}>
              <item.icon className="sidebar-item-icon h-5 w-5" />
              <span className="sidebar-item-label">{item.label}</span>
            </div>
          ))
        }
      </aside>
      {
        activeSidebar && <div className={`secondary-panel ${isPanelColleapsed ? 'collapsed' : ''}`}
          style={{
            width: isPanelColleapsed ? '0' : "320px",
            opacity: isPanelColleapsed ? 0 : 1,
            overflow: isPanelColleapsed ? 'hidden' : 'visible'
          }}
        >
          <div className="panel-header" >
            <button className="back-button" onClick={closeSecondaryPanel}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="panel-title">{activeItem.label}</span>
          </div>
          <div className="panel-content " >{activeItem?.panel()}</div>
          <button className="collapse-button"
            onClick={togglePanelCollagpse}

          >
            <ChevronLeft className="h-5 w-5" />
          </button>

        </div>
      }
    </div>
  );
}

export default Sidebar;
