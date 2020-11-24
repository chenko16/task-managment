import * as React from "react";
import {User, UserRequest} from "../../store/users/Types";
import UsersForm from "../users/UsersForm";
import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";
import {AppBar, Grid, Tab, Tabs} from "@material-ui/core";


export interface SettingsFormProps {
    users: User[],
    isLoading: boolean,
    currentTab?: number,
    displayError(errorMessage: string): any,
    createUser(user: UserRequest, okCallback?, errorCallback?): any
}

export interface SettingsFormState {
    currentTab: number
}

export class SettingsForm extends React.Component<SettingsFormProps, SettingsFormState>{

    schemeParts: Array<any>

    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.currentTab? this.props.currentTab : 0
        }
    }

    buildParts() {
        this.schemeParts = [
            {
                name: "Проекты",
                value: <React.Fragment></React.Fragment>,
                icon: <FolderIcon/>
            },
            {
                name: "Пользователи",
                value: <UsersForm
                    users={this.props.users}
                    isLoading={this.props.isLoading}
                    displayError={this.props.displayError}
                    createUser={(user) => {
                        this.props.createUser(user)
                    }}
                />,
                icon: <PersonIcon/>
            }
        ]
    }

    render() {
        this.buildParts()
        return (
            <React.Fragment>
                <Grid container justify="center">
                    <Grid spacing={2} style={{width: "100%", marginTop: 12}}>
                        <Grid item xs={6} style={{maxWidth: "100%"}}>
                            <AppBar position="static" >
                                <Tabs
                                    style={{maxWidth: "500"}}
                                    centered
                                    value={this.state.currentTab}
                                    onChange={(event, value) => {
                                        this.setState({currentTab: value})
                                    }}
                                >
                                    {this.schemeParts.map((part, index) => {
                                            return <Tab label={part.name} icon={part.icon}/>
                                    })}
                                </Tabs>
                            </AppBar>
                        </Grid>
                    </Grid>
                    <Grid spacing={2} style={{width: "100%", marginTop: 12}}>
                        <Grid item xs={10} style={{maxWidth: "100%"}}>
                            {this.schemeParts[this.state.currentTab].value}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}