import React, { Dispatch, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import { Action } from 'redux'
import { connect } from 'react-redux';

import { RootState } from '../../../store'
import { action } from '../../../store'
import { request } from '../../../api/request'
import CustomizedSnackbar from '../../../feedback/Snackbar'



function SimpleTable({ patients, getPatients }: any) {
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })
  const [button, setButton] = useState( false )


  const handleClickDelete = ( _id:string ) => {
    setButton( true )

    request('/delete/patient', 'POST', { _id })
      .then(({ message, severity }:any) => {
        setSnackbar({ open: true, message, severity })
        setButton( false )
      })

    // remove array patients in reducer
    const patient = patients.find((item: any) => item._id = _id)
    const arr = patients.filter((n: any) => n._id !== patient._id)
    getPatients( arr )
    setButton( false )
  }

  return (
    <TableContainer component={ Paper }>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Пациент</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Время</TableCell>
            <TableCell align="right">Жалобы</TableCell>
            <TableCell align="right">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            patients &&
              patients.map((row: any) => (
                <TableRow key={ row._id }>
                  <TableCell component="th" scope="row">
                    { row.patient }
                  </TableCell>
                  <TableCell align="right">{ row.date }</TableCell>
                  <TableCell align="right">{ row.time }</TableCell>
                  <TableCell align="right">{ row.complaints }</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" 
                      color="secondary"
                      disabled={ button }
                      onClick={() => handleClickDelete( row._id )}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>

      <CustomizedSnackbar 
        open={snackbar.open} 
        message={snackbar.message} 
        severity={snackbar.severity}
      />
    </TableContainer>
  );
}

const mapStateToProps = ( state: RootState ) => ({
  patients: state.doctor.patients,
})

const mapDispathToProps = ( dispath: Dispatch<Action> ) => ({
  getPatients: (patients: Array<object> | null) => dispath( action.doctor.getPatients( patients ))
})

export default connect( mapStateToProps, mapDispathToProps )( SimpleTable )



const useStyles = makeStyles({
  table: {
    width: '100%',
  }
})