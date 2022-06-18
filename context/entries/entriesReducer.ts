import { EntriesState } from './'


type EntriesActionType = 
     | { type: '[Entries] - action' }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

  switch (action.type) {
    // case '[Entries] - action':
    //   return {
    //     ...state,
    //   }

    default:
      return state;
  }
}