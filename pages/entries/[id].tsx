import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
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

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { MainLayout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry
}

export const EntryPage:FC<Props>  = ({ entry }) => {

  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const router = useRouter();

  const [inputValue, setInputValue] = useState( entry.description );
  const [status, setStatus] = useState<EntryStatus>( entry.status );
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);


  const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value );
  }

  const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setStatus( event.target.value as EntryStatus);
  }

  const onSave = () => {
    if ( inputValue.trim().length === 0 ) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    } 

    updateEntry( updatedEntry, true );
    router.push('/')
  }

  const onDelete = () => {
    deleteEntry( entry, true );
    router.push('/')
  }

  return (
    
    <MainLayout title={ inputValue.substring(0,20) + '...' }>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: `}
              subheader={`Created at: ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
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
                onBlur={ () => setTouched(true) }
                onChange={ onInputValueChanged }
                helperText={ isNotValid && 'Enter a value' }
                error={ isNotValid }
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
                disabled={ inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={ onDelete }
        sx={{
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // console.log(ctx.params);
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if ( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}


export default EntryPage
