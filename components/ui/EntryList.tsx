import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from "../../interfaces"
import { EntryCard } from './'
import styles from './EntryList.module.css'


interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  // console.log({status});
  const { entries, updateEntry } = useContext( EntriesContext )
  const { isDraggingEntry, dragging } = useContext( UIContext)

  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [ entries, status ])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  
  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
    const id = event.dataTransfer.getData('text');
    console.log({id})
    const entry = entries.find( e => e._id === id )!;
    entry.status = status;
    updateEntry(entry);
    dragging( false )
  }

  return (
    // TODO: aquí haremos drop
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDraggingEntry ? styles.dgging : '' }
    >
      <Paper
        sx={{
         height: 'calc(100vh - 180px)',
         overflow: 'scroll',
         backgroundColor: 'transparent',
         padding: '3px 5px',
         '&::-webkit-scrollbar': { display: 'none' },
        }}>

        {/* TODO: cambiará dependiendo si está haciendo drag o no */}
        <List sx={{ opacity: isDraggingEntry ? 0.3 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry }/>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}

