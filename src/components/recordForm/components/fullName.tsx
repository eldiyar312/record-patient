import React, { Dispatch, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { Action } from 'redux'
import { connect } from 'react-redux';

import { RootState } from '../../../store'
import { action } from '../../../store'



function FullName ({ patientName, _id_doctor, changeNamePatient, changeNameDoctor, doctorFullName }: any ) {
  const classes = useStyles()
  const [helperTextPatient, setHelperTextPatient] = useState<string>('')
  const [helperTextDoctor, setHelperTextDoctor] = useState<string>('')
  const [errorPatient, setErrorPatient] = useState( false )
  const [errorDoctor, setErrorDoctor] = useState( false )


  useEffect(() => {
    handleChangeName( patientName )
    handleNameDoctor('')
  }, [])


  const handleChangeName = ( name: string ) => {
    if( name.length < 5 ){
      setHelperTextPatient('Минимальное значение 5')
      setErrorPatient( true )
    } else if( name.length > 100 ){
      setHelperTextPatient('Максимальное значение 100')
      setErrorPatient( true )
    } else {
      setHelperTextPatient('')
      setErrorPatient( false )
    }
    changeNamePatient( name )
  }

  const handleNameDoctor = ( name: string | any ) => {
    if( !name.trim() ){
      setHelperTextDoctor('Обьязательное поле')
      setErrorDoctor( true )
    } else {
      setHelperTextDoctor('')
      setErrorDoctor( false )
    }
    changeNameDoctor( name )
  }


  return (
    <>
      <TextField 
        error={ errorPatient }
        id="outlined-basic" 
        label="ФИО пациента" 
        variant="outlined"
        value={ patientName }
        helperText={ helperTextPatient }
        onChange={name => handleChangeName( name.target.value )}
      />

      <br/>

      <FormControl 
        variant="outlined" 
        className={ classes.formControl }
        error={ errorDoctor }
      >
        <InputLabel id="demo-simple-select-outlined-label">ФИО врача</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={name => handleNameDoctor( name.target.value )}
          value={ _id_doctor }
        >
          {
            doctorFullName ?
              doctorFullName.map(( doctor: any ) =>
                <MenuItem value={doctor._id} key={doctor._id}>{doctor.fullName}</MenuItem>
              )
              :
              <CircularProgress />
          }
        </Select>
        <FormHelperText>{ helperTextDoctor }</FormHelperText>
      </FormControl>
    </>
  )
}


const mapStateToProps = ( state: RootState ) => ({
  patientName: state.record.patient,
  _id_doctor: state.record._id_doctor,
  doctorFullName: state.record.doctorFullName
})

const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  changeNamePatient: (name: string) => dispath( action.record.changeNamePatient( name )),
  changeNameDoctor: (name: string) => dispath( action.record.changeNameDoctor( name ))
})


export default connect( mapStateToProps, mapDispathToProps )( FullName )




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  })
)
