import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { UIContext } from '../../context/ui';
import { Entry } from "../../interfaces"


interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { dragging } = useContext( UIContext )

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

  return (
    <Card
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
          <Typography variant='body2'>30 minutes ago</Typography>
        </CardActions>

      </CardActionArea>
    </Card>
  )
}
