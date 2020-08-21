import { Reducer } from 'redux'
import { doctorScheduleState } from './interface'
import { doctorScheduleType } from './type'


const dateNow = new Date().toISOString().split('T')[0]

const defaultState: doctorScheduleState = {
  _id_doctor: '',
  date: dateNow,
  patients: null
}


const doctorScheduleReducer: Reducer<doctorScheduleState, any> = ( state = defaultState, action ) => {
  switch( action.type ){
    case doctorScheduleType.CHANGE_NAME_DOCTOR:
      {
        return {
          ...state,
          _id_doctor: action._id_doctor
        }
      }
    case doctorScheduleType.CHANGE_DATE:
      {
        return {
          ...state,
          date: action.date
        }
      }
    case doctorScheduleType.GET_PATIENTS:
      {
        return {
          ...state,
          patients: action.patients
        }
      }
    default: {
      return state
    }
  }
}

export default doctorScheduleReducer