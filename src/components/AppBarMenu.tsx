import React, { Dispatch, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"
import { Action } from 'redux'
import { connect } from 'react-redux';

import { action } from '../store'
import { get } from '../api/getDoctors'

interface Props {
  changeDoctorFullName: (name: string) => void
}

const AppBarMenu: React.FC<Props> = ({ changeDoctorFullName }) => {
  const classes = useStyles()

  useEffect(() => {
    get('/doctor')
      .then(({ doctors }) => changeDoctorFullName( doctors ))
  }, [ changeDoctorFullName ])


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Link to='/'>
              <Button color="secondary" variant="contained">
                Форма записи
              </Button>
            </Link>
            <Link to='/about'>
              <Button color="secondary" variant="contained">
                Расписание врача
              </Button>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}



const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  changeDoctorFullName: (name: string) => dispath( action.record.changeDoctorFullName( name )),
})

export default connect( null, mapDispathToProps )( AppBarMenu )




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }),
)
