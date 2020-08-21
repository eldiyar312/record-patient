import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Provider } from 'react-redux'

import AppStack from './pages/AppStack'
import store from './store/store'


export default function App() {
  return (
    <Provider store={ store }>
      <Router>
          <Switch>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <Route path="/" component={ AppStack } />
            </MuiPickersUtilsProvider>
          </Switch>
      </Router>
    </Provider>
  )
}