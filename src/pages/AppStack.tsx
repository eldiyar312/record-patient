import React from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import DoctorSchedule from '../components/doctorSchedule/doctorSchedule'
import RecordForm from '../components/recordForm/recordForm'
import AppBarMenu from '../components/AppBarMenu'


const AppStack = () => {
  return (
    <>
      <AppBarMenu />
      <Redirect to='/'/>
      <Switch>
        <Route exact path="/" component={ RecordForm }/>
        <Route path="/about" component={ DoctorSchedule }/>
      </Switch>
    </>
  )
}

export default AppStack