import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  open: boolean, 
  message: string, 
  severity: any,
}

const CustomizedSnackbar: React.FC<Props> = ({ open = false, message = '', severity = 'success' }) => {
  const classes = useStyles()
  
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    open = false
  }


  return (
    <div className={classes.root}>
      <Snackbar open={ open } autoHideDuration={ 3000 } onClose={ handleClose }>
        <Alert onClose={ handleClose } severity={ severity }>
          { message }
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbar

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));