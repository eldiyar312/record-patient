import 'date-fns';
import React, { Dispatch, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  CircularProgress
} from '@material-ui/core';
import { Action } from 'redux'
import { connect } from 'react-redux';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { RootState } from '../../../store'
import { action } from '../../../store'
import { request } from '../../../api/request'
import CustomizedSnackbar from '../../../feedback/Snackbar'



function FilterSchedule({ changeNameDoctor, _id_doctor, changeDate, date, doctorFullName, getPatients }: any) {
  const classes = useStyles()
  const [ helperTextDoctor, setHelperTextDoctor ] = useState<string>('')
  const [ errorDoctor, setErrorDoctor ] = useState( false )
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })
  const [button, setButton] = useState( false )


  useEffect(() => {
    handleNameDoctor('')
  }, [])

  // date parse in normal format 2020-08-19
  function handleDateChange ( date: Date | null ){
    if ( date ) {
      changeDate( date.toISOString().split('T')[0] )
    }
  }
  // validation select
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

  const handleClick = async () => {
    setButton( true )
    // Get patient
    const { patients, message } = await request('/patient', 'POST', { _id_doctor, date })

    if( !patients ){
      setSnackbar({ open: true, message: 'Не найдено :(', severity: 'error' })
      setButton( false )
    } else {
      getPatients( patients )
      setSnackbar({ open: true, message: 'Ура! Нашёл :)', severity: 'success' })
      setButton( false )
    }
  }

  
  return (
  <>
      <div className={classes.root}>
        <FormControl
          variant="outlined" 
          className={ classes.formControl }
          error={ errorDoctor }
        >
          <InputLabel id="demo-simple-select-outlined-label">ФИО врача</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={ name => handleNameDoctor( name.target.value )}
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

        <FormControl variant="outlined" className={ classes.formControl }>
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Дата записи"
              format="MM/dd/yyyy"
              value={ date }
              onChange={ handleDateChange }
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
          />
        </FormControl>

        <br/>

        <Button 
          variant="contained" 
          color="secondary"
          onClick={ handleClick }
          disabled={ button }
        >
          Искать
        </Button>
        
      </div>


      <CustomizedSnackbar 
        open={snackbar.open} 
        message={snackbar.message} 
        severity={snackbar.severity}
      />
    </>
  )
}


const mapStateToProps = ( state: RootState ) => ({
  _id_doctor: state.doctor._id_doctor,
  date: state.doctor.date,
  doctorFullName: state.record.doctorFullName
})

const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  changeNameDoctor: (_id_doctor: string) => dispath( action.doctor.changeNameDoctor( _id_doctor )),
  changeDate: (date: string) => dispath( action.doctor.changeDate( date )),
  getPatients: (patients: Array<object> | null) => dispath( action.doctor.getPatients( patients ))
})

export default connect( mapStateToProps, mapDispathToProps )( FilterSchedule )


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 280,
      marginRight: 30
    },
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    }
  })
)