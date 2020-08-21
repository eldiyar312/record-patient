import { Reducer } from 'redux'
import { recordFormState } from './interface'
import { recordFormType } from './type'

const dateNow = new Date().toISOString().split('T')[0]

const defaultState: recordFormState = {
  patient: '',
  _id_doctor: '',
  date: dateNow,
  time: '09:00',
  complaints: '',
  doctorFullName: null
}


const recordFormReducer: Reducer<recordFormState, any> = ( state = defaultState, action ) => {
  switch( action.type ){
    case recordFormType.CHANGE_NAME_PATIENT:
      {
        return {
          ...state,
          patient: action.name
        }
      }
    case recordFormType.CHANGE_NAME_DOCTOR:
      {
        return {
          ...state,
          _id_doctor: action._id_doctor
        }
      }
    case recordFormType.CHANGE_DATE:
      {
        return {
          ...state,
          date: action.date
        }
      }
    case recordFormType.CHANGE_TIME:
      {
        return {
          ...state,
          time: action.time
        }
      }
    case recordFormType.CHANGE_COMPLAINTS:
      {
        return {
          ...state,
          complaints: action.complaints
        }
      }
    case recordFormType.CHANGE_DOCTOR_FULL_NAME:
      {
        return {
          ...state,
          doctorFullName: action.doctorFullName
        }
      }
    default: {
      return state
    }
  }
}

export default recordFormReducer