import 'date-fns';
import React, { Dispatch } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { Action } from 'redux'
import { connect } from 'react-redux';

import { RootState } from '../../../store'
import { action } from '../../../store'



function ReacordDate ({ date, time, changeDate, changeTime }: any ) {
  const classes = useStyles()

  const hour = ['09', '10', '11', '12', '13', '14', '15', '16', '17']
  const minute = ['00', '30']


  // date parse in normal format
  function handleDateChange ( date: Date | null ){
    if ( date ) {
      changeDate( date.toISOString().split('T')[0] )
      // 2020-08-19
    }
  }



  return (
    <div className={classes.root}>
      <FormControl variant="outlined">
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

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Время записи</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
          value={ time }
          onChange={time => changeTime( time.target.value )}
        >
          {
            hour.map(hour => (
              minute.map(min => (
                <MenuItem value={`${hour}:${min}`}>{hour}:{min}</MenuItem>
              ))
            ))
          }
        </Select>
      </FormControl>
    </div>
  )
}

const mapStateToProps = ( state: RootState ) => ({
  date: state.record.date,
  time: state.record.time
})

const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  changeDate: ( date: string ) => dispath( action.record.changeDate( date )),
  changeTime: ( time: string ) => dispath( action.record.changeTime( time ))
})

export default connect( mapStateToProps, mapDispathToProps )( ReacordDate )




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 150,
      marginLeft: 10
    },
    root: {
      display: 'flex',
      alignItems: 'center'
    }
  })
)
