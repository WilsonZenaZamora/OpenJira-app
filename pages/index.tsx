import type { NextPage } from 'next'
import { Card, CardHeader, Grid } from '@mui/material'

import { MainLayout } from '../components/layouts'
import { EntryList } from '../components/ui'


const HomePage: NextPage = () => {
  return (
    // <Typography variant='h1' color='primary'>Hello World</Typography>
    <MainLayout title='Home - OpenJira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendings"/>

              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList />
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="In Progress"/>
            <EntryList />
          </Card>

        </Grid><Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Finished"/>
            <EntryList />
          </Card>
        </Grid>

      </Grid>     
    </MainLayout>
  )
}

export default HomePage
