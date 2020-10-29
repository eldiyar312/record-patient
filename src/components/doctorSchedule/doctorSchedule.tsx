import React from 'react';

import VirtualizedTable from './components/table'
import FilterSchedule from './components/filterSchedule'


const DoctorSchedule = () => {
  return (
    <>
      <FilterSchedule />

      <br/>

      <VirtualizedTable/>
    </>
  )
}

export default DoctorSchedule