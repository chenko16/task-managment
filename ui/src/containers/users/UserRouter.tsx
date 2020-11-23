import * as React from 'react'
import 'typeface-roboto'
import {Route, RouteProps} from 'react-router-dom';
import {UserInfoView} from "./UserInfoView";
import SettingsView from "../settings/SettingsView";

export default class UserRouter extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/users" exact component={SettingsView}/>
                <Route path="/users/:id" exact component={UserInfoView}/>
            </React.Fragment>
        )
    }
}
