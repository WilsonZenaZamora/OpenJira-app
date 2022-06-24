import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );

  const addNewEntry = ( description: string ) => {

    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      createdAt: Date.now(),
      status: 'pending'
    };

    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
  }

  const updateEntry = ( entry: Entry ) => {
    dispatch({ type: '[Entry] - Entry-Updated', payload: entry });
  }

  // Read the entries from the backend
  const refreshEntries = async() => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh-Data', payload: data });
    // console.log({data})
  }

  useEffect(() => {
    refreshEntries();
  }, [])
  
  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
    }}>
      { children }
    </EntriesContext.Provider>
  )
}