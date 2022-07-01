import { ChangeEvent, useState } from 'react';
import { 
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField } from '@mui/material'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MainLayout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage = () => {

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

  const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value );
  }

  const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setStatus( event.target.value as EntryStatus);
  }

  const onSave = () => {
    
  }

  return (
    
    <MainLayout title='.... ... ....'>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${ inputValue }`}
              subheader={`Created at: .... minutes`}
            />

            <CardContent>
              <TextField 
                sx={{ marginTop:2, marginBottom: 1 }}
                fullWidth
                placeholder='New Entry'
                autoFocus
                multiline
                label='New Entry'
                value={ inputValue }
                onChange={ onInputValueChanged }
              />

              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={ status }
                  onChange={ onStatusChanged }
                >
                  {
                    validStatus.map( option => (
                      <FormControlLabel 
                        key={ option }
                        value={ option }
                        control={ <Radio /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

            </CardContent>

            <CardActions>
              <Button
                startIcon={ <SaveOutlinedIcon/> }
                variant='contained'
                fullWidth
                onClick={ onSave }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
        position:'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'red'
      }}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>

    </MainLayout>

  )
}

export default EntryPage
