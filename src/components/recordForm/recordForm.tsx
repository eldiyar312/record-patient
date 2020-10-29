import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FullName from './components/fullName'
import ReacordDate from './components/recordDate'
import Complaints from './components/complaints'


const ReacordForm = () => {
  const classes = useStyles()
  

  return (
    <form className={classes.root} autoComplete="off">
      <FullName />
      <br/>
      <ReacordDate />
      <br/>
      <Complaints />
    </form>
  )
}

export default  ReacordForm


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
      padding: 20
    }
  })
)
