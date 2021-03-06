import { FC, PropsWithChildren, useReducer } from 'react';

import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDraggingEntry: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => { dispatch({ type: 'UI - Open Sidebar' }) };

  const closeSideMenu = () => { dispatch({ type: 'UI - Close Sidebar' }) };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
  };

  const dragging = (isDragging: boolean) => {
    dispatch({ type: 'UI - Dragging', payload: isDragging });
  }

  const values = {
    ...state,

    //Methods
    closeSideMenu,
    openSideMenu,

    setIsAddingEntry,

    dragging,
  };
  return (
    <UIContext.Provider value={values}>
      {children}
    </UIContext.Provider>
  )
};
