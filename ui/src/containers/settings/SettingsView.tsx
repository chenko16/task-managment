import * as React from "react";
import {Grid} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as userSelectors from "../../store/users/Reducer";
import * as userActions from "../../store/users/Actions";
import {connect} from "react-redux";
import {User} from "../../store/users/Types";
import {SettingsForm} from "../../components/settings/SettingsForm";


export interface SettingsViewDispatchProps {
    fetchUsers() : any
}

export interface SettingsViewStateProps {
    users: User[],
    isLoading: boolean
}

export interface SettingsViewProps {
    currentTab?: number
}

export interface SettingsViewState {

}

class SettingsView extends React.Component<SettingsViewStateProps & SettingsViewDispatchProps & SettingsViewProps, SettingsViewState>{
    constructor(props) {
        super(props);

        this.props.fetchUsers();
    }

    render(): React.ReactNode {
        console.log("fuck")

        if (this.props.isLoading)
            return this.renderLoader();

        return (
            <React.Fragment>
                <SettingsForm
                    currentTab={this.props.currentTab}
                    users={this.props.users}
                    isLoading={this.props.isLoading}
                />
            </React.Fragment>
        )
    }


    renderLoader() {
        return (
            <Grid container style={{width: "100%", marginTop: 32, paddingBottom: 32}} justify="center" alignItems="center">
                <Grid item>
                    <CircularProgress disableShrink/>
                </Grid>
            </Grid>
        )
    }

}


function mapStateToProps(state) : SettingsViewStateProps {
    return {
        users : userSelectors.getAllUsers(state),
        //projects: projectSelectors.getProjects(state),
        isLoading: userSelectors.usersIsFetching(state)
    }
}



function mapDispatchToProps(dispatch: any): SettingsViewDispatchProps {
    return {
        fetchUsers: () => {
            dispatch(userActions.fetchUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);