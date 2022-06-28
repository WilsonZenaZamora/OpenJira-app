import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { EntryModel, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query
  // console.log(req.query) //Show the ID of the entry in db

  if ( !mongoose.isValidObjectId( id ) ) {
    return res.status(400).json({ message: 'The ID is not valid ' + id });
  }

  switch ( req.method ) {
    case 'PUT':
      return updateEntry( req, res );

    case 'GET':
      return getEntry( req, res );
  
    default:
      return res.status(200).json({ message : 'Method does not exist' })
  }
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;
  
  await db.connect();
  const entryInDB = await EntryModel.findById( id );
  await db.disconnect();

  if ( !entryInDB ) {
    return res.status(400).json({ message: 'There is no entry with that ID ' + id })
  } else {
    res.status(200).json(entryInDB)
  }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await EntryModel.findById( id );

  if ( !entryToUpdate ) {
    await db.disconnect();
    return res.status(400).json({ message: 'There is no entry with that ID ' + id })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    res.status(200).json( updatedEntry! );

  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }


}