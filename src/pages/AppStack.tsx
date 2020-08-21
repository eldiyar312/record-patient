import React from "react"
import {
  Switch,
  Route,
} from "react-router-dom"

import DoctorSchedule from '../components/doctorSchedule/doctorSchedule'
import RecordForm from '../components/recordForm/recordForm'
import AppBarMenu from '../components/AppBarMenu'


export default function AppStack() {
  return (
    <>
      <AppBarMenu />
      
      <Switch>
        <Route exact path="/" component={ RecordForm }/>
        <Route path="/about" component={ DoctorSchedule }/>
      </Switch>
    </>
  )
}