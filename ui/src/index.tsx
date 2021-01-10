import 'babel-polyfill';
import 'whatwg-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './containers/App'
import {createMuiTheme, Grid, MuiThemeProvider} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue'

import {BrowserRouter, Switch} from "react-router-dom"
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux';
import {persistor, store} from './store/Store';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ConfigService from "./services/ConfigService";
import StatusSnackBar from "./containers/StatusSnackBar";


require('./index.html')
const theme = createMuiTheme({
    palette: {
        primary: {main: blue[900]},
        secondary: {main: blue[500]}
    },
    overrides: {
        MuiTableCell: {
            head: {
                color: "rgba(0, 0, 0, 0.54)",
                fontSize: "0.75rem",
                fontWeight: 500,
                lineHeight: "1.5rem"
            }
        }
    }
})

ReactDOM.render(
    <BrowserRouter basename={ConfigService.getBasePath()}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Switch>
                    <MuiThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <CssBaseline/>
                            <App style={{height: "100%", width: "100%"}}/>
                            <StatusSnackBar/>
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </Switch>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);

if (module && module.hot) {
    module.hot.accept();
}
