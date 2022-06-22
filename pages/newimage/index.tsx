import { NextPage } from 'next'
import { Card, CardHeader, Grid, IconButton, Input } from '@mui/material'
import { UploadOutlined } from '@mui/icons-material'

import { MainLayout } from '../../components/layouts'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import imagen from '../newimage/imge/casa01.jpeg'


const ImagePage: NextPage = () => {

  const imageCharged = ({target}: ChangeEvent<HTMLInputElement>) => {
    console.log(target.files)
  }

  return (
    <MainLayout>
      <Grid container spacing={1} sx={{padding: '10px', marginRight: 10 }}>
        <Grid xs={6}>
          <Card>
            <CardHeader title='Upload Image'/>
            <Input
              id='btnFile'
              type='file'
              onChange={ imageCharged }
              style={{ display: 'none' }}             
            />
            <IconButton>
              <label htmlFor='btnFile'>
                <UploadOutlined />
              </label>
            </IconButton>          
          </Card>
        </Grid>

        <Grid xs={6}>
          <Card>
            <CardHeader title='Image'/>
            <Image 
              src={imagen}
              alt='text'
              width={150}
              height={150}
            />
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default ImagePage

