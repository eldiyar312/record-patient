import { StateType } from 'typesafe-actions'

import rootReducer from "./root-reducer"
import * as recordFormActions from './recordForm/actions'
import * as doctorSchedule from './doctorSchedule/actions'


export const action = {
  record: recordFormActions,
  doctor: doctorSchedule
}



export type RootState = StateType<typeof rootReducer>