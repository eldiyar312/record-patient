import React from 'react';

import VirtualizedTable from './components/table'
import FilterSchedule from './components/filterSchedule'


function DoctorSchedule({ changeNameDoctor, doctor, changeDate, date, doctorFullName }: any) {
  return (
    <>
      <FilterSchedule />

      <br/>

      <VirtualizedTable/>
    </>
  )
}

export default DoctorSchedule