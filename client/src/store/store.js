"use client"

import { centerCanvas } from "@/fabric/fabric-utils";
import { create } from "zustand"
import { debounce } from "lodash";
import { saveDesign } from "@/service/design-service";

export const useEditorStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas)
    }
  },

  designId: null,
  setDesignId: (id) => set({ designId: id }),

  isEditing: true,
  setIsEditing: (flag) => set({ isEditing: flag }),

  name: '',
  setName: (value) => set({ name: value }),

  showProperties: false,
  setShowProperties: (flag) => set({ showProperties: flag }),

  saveStatus: "saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
  lastModified: Date.now(),
  isModified: false,

  markAsModified: () => {
    const designId = get().designId

    if (designId) {
      set({
        lastModified: Date.now(),
        saveStatus: "Saving",
        isModified: true
      });
      // Call the save function!
      get().debouncedSave();
    }
    else {
      console.error("No design ID found");

    }
  },

  saveToServer: async () => {
    const designId = get().designId
    const canvas = get().canvas
    const name = get().name

    if (!designId || !canvas || !name) {
      console.error("Missing designId, canvas, or name");
      return;
    }

    try {
      const json = canvas.toJSON();

      const response = await saveDesign({ 
        name, 
        canvasData: JSON.stringify(json) 
      }, designId);
      console.log(response);

      return response;

    } catch (error) {
      console.error("Error saving to server:", error);
      return { success: false, error: error.message };
    }

  },

  debouncedSave: debounce(async () => {
    const result = await get().saveToServer();
    if (result?.success) {
      set({
        saveStatus: "saved",
        isModified: false
      });
    } else {
      set({ saveStatus: "error" });
    }
  }, 1000),


  resetStore: () => {
    set({
      canvas: null,
      designId: null,
      isEditing: true,
      name: "",
      showProperties: false,
      saveStatus: "saved",
      lastModified: Date.now(),
      isModified: false,
    });
  },
}))

