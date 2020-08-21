export interface recordFormState {
  patient: string,
  _id_doctor: string,
  date: string,
  time: string,
  complaints: string,
  doctorFullName: Array<object> | null,
}