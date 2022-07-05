import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { UIContext } from '../../context/ui';
import { Entry } from "../../interfaces"

import { dateFunctions } from '../../utils';


interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { dragging } = useContext( UIContext )
  const router = useRouter()

  const onDragStart = ( event: DragEvent ) => {
    // console.log(event);
    event.dataTransfer.setData('text', entry._id)

    dragging( true );
    // TODO: Modificar el estado para indicar que estoy haciendo drag
  }

  const onDragEnd = () => {
    // TODO: Fin del drag
    dragging( false );
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`);
  }


  return (
    <Card
      onClick={ onClick }
      sx={{ marginBottom: '7px' }}
      // Eventos de drag
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
    >
      <CardActionArea>

        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
        </CardActions>

      </CardActionArea>
    </Card>
  )
}
