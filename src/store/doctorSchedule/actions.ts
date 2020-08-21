import { doctorScheduleType } from './type'


export const changeNameDoctor = ( _id_doctor: string ) => {
  return {
    type: doctorScheduleType.CHANGE_NAME_DOCTOR,
    _id_doctor
  }
}

export const changeDate = ( date: string ) => {
  return {
    type: doctorScheduleType.CHANGE_DATE,
    date
  }
}

export const getPatients = ( patients: Array<object> | null ) => {
  return {
    type: doctorScheduleType.GET_PATIENTS,
    patients
  }
}
