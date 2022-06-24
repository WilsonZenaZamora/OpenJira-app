//Endpoint db from MongoDB

import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database';
import EntryModel from '../../models/Entry';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if ( process.env.NODE_ENV === 'production' ) {
    return res.status(401).json({ message: 'No tienes acceso a este servicio' });
  }

  await db.connect();
  await EntryModel.deleteMany();   //deleteMany elimina todos los datos que tenga guardados en la coleccion entries
  await EntryModel.insertMany( seedData.entries );

  await db.disconect();

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}