import type { NextPage } from 'next'
import { Card, CardHeader, Grid } from '@mui/material'

import { MainLayout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'


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
              <NewEntry />
              <EntryList status='pending'/>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="In Progress"/>
            <EntryList status='in-pprogress'/>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Finished"/>
            <EntryList status='finished'/>
          </Card>
        </Grid>

      </Grid>     
    </MainLayout>
  )
}

export default HomePage
