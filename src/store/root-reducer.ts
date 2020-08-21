import { combineReducers } from 'redux'

import recordFormReducer from './recordForm/reducer'
import doctorScheduleReducer from './doctorSchedule/reducer'


const rootReducer = combineReducers ({
  record: recordFormReducer,
  doctor: doctorScheduleReducer
})

export default rootReducer