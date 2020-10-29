import React, { Dispatch, useState } from 'react';
import {
  TextField,
  Button
} from '@material-ui/core';
import { Action } from 'redux'
import { connect } from 'react-redux';

import { RootState } from '../../../store'
import { action } from '../../../store'
import { request } from '../../../api/request'
import CustomizedSnackbar from '../../../feedback/Snackbar'

interface Props {
  patient: string, 
  _id_doctor: string, 
  date: string, 
  time: string, 
  complaints: string, 
  changeComplaints: (complaint: string) => void,
}

const Complaints: React.FC<Props> = ({ 
  patient, 
  _id_doctor, 
  date, 
  time, 
  complaints, 
  changeComplaints,
}) => {

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })
  const [button, setButton] = useState( false )

  const changeClick = () => {
    setButton( true )
    // Record patient
    if( !patient.trim() || !_id_doctor.trim() ){
      setSnackbar({ open: true, message: 'Заполните нужные поля!', severity: 'error' })
      setButton( false )
    }
    else {
      request(
        '/record', 'POST', 
        { patient, _id_doctor, date, time, complaints }
      )
        .then(({ message, severity }:any) => (
          setSnackbar({ open: true, message, severity }),
          setButton( false )
        ))
    }
  }

  return (
    <>
      <TextField 
        id="outlined-basic" 
        label="Жалобы" 
        variant="outlined"
        value={ complaints }
        onChange={e => changeComplaints( e.target.value )}
      />

      <br/>

      <Button 
        variant="contained" 
        color="secondary"
        onClick={ changeClick }
        disabled={ button }
      >
        Записаться
      </Button>

      <CustomizedSnackbar 
        open={snackbar.open} 
        message={snackbar.message} 
        severity={snackbar.severity}
      />
    </>
  )
}


const mapStateToProps = ( state: RootState ) => ({
  patient: state.record.patient,
  _id_doctor: state.record._id_doctor,
  date: state.record.date,
  time: state.record.time,
  complaints: state.record.complaints,
})

const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  changeComplaints: (complaint: string) => dispath( action.record.changeComplaints( complaint )),
})


export default connect( mapStateToProps, mapDispathToProps )( Complaints )