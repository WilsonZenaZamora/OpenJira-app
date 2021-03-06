import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material'

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/AddCircleOutline';

export const NewEntry = () => {
  
  const { addNewEntry } = useContext( EntriesContext );
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )
  
  // const [isAdding, setIsAdding] = useState( false );
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState( false );

  const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value );
  }

  const onSave = () => {
    if ( inputValue.length === 0 ) return;
      
      addNewEntry(inputValue);
      setIsAddingEntry( false );
      setTouched( false );
      setInputValue('');

  }

  const onCancel = () => {
    setIsAddingEntry(false);
    setTouched( false );
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry ? (
          <>
            <TextField 
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='New entry'
              autoFocus
              multiline
              label='New entry'
              onChange={ onTextFieldChanged }
              value={ inputValue }
              onBlur={ () => setTouched(true) }
              helperText={ inputValue.length <= 0 && touched && 'Enter a value' }
              error={ inputValue.length <= 0 && touched }
            />

            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={ onCancel }
              >
                Cancel
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                endIcon={ <SaveIcon /> }
                onClick={ onSave }
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button
              startIcon={ <AddIcon /> }
              fullWidth
              variant='outlined'
              onClick={ () => setIsAddingEntry( true ) }
            >
              Add Task
            </Button>
          </>
        )
      }

    </Box>
  )
}
