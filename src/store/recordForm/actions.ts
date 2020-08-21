import { recordFormType } from './type'


export const changeNamePatient = ( name: string ) => {
  return {
    type: recordFormType.CHANGE_NAME_PATIENT,
    name
  }
}

export const changeNameDoctor = ( _id_doctor: string ) => {
  return {
    type: recordFormType.CHANGE_NAME_DOCTOR,
    _id_doctor
  }
}

export const changeDate = ( date: string ) => {
  return {
    type: recordFormType.CHANGE_DATE,
    date
  }
}

export const changeTime = ( time: string ) => {
  return {
    type: recordFormType.CHANGE_TIME,
    time
  }
}

export const changeComplaints = ( complaint: string ) => {
  return {
    type: recordFormType.CHANGE_COMPLAINTS,
    complaint
  }
}

export const changeDoctorFullName = ( doctorFullName: string ) => {
  return {
    type: recordFormType.CHANGE_DOCTOR_FULL_NAME,
    doctorFullName
  }
}