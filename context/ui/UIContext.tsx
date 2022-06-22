import { createContext } from 'react';


interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggingEntry: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  
  setIsAddingEntry: (isAdding: boolean) => void;
  dragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps );