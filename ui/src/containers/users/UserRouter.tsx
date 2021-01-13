import * as React from 'react'
import 'typeface-roboto'
import {Route} from 'react-router-dom';
import SettingsView from '../settings/SettingsView';

export default class UserRouter extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route path='/users' exact={true} render={() => <SettingsView currentTab={1}/>}/>
            </React.Fragment>
        )
    }
}
