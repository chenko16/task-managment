import * as React from "react";
import {Grid} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as userSelectors from "../../store/users/Reducer";
import * as userActions from "../../store/users/Actions";
import * as projectSelectors from "../../store/project/Reducer";
import * as projectActions from "../../store/project/Actions";
import * as notificationActions from "../../store/notification/Actions";
import {connect} from "react-redux";
import {SystemRole, User, UserRequest} from "../../store/users/Types";
import {SettingsForm} from "../../components/settings/SettingsForm";
import {BusinessRole, Project, ProjectsByUsers, RoleInProject} from "../../store/project/Types";
import {user} from "../../store/auth/Reducer";


export interface SettingsViewDispatchProps {
    fetchUsers() : any,
    displayError(msg: string): any,
    createUser(user: UserRequest, okCallback?, errorCallback?): any,
    updateUserStatus(id: number, status: boolean, okCallback?, errorCallback?): any,
    updateUserRole(id: number, role: SystemRole, okCallback?, errorCallback?): any,
    fetchProjects(): any,
    fetchProjectsByUser(userId: number, okCallback?, errorCallback?): any
}

export interface SettingsViewStateProps {
    users: User[],
    projects: Project[],
    projectsByUser: ProjectsByUsers | undefined,
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
        this.props.fetchProjects();
    }

    render(): React.ReactNode {
        if (this.props.isLoading)
            return this.renderLoader();

        return (
            <React.Fragment>
                <SettingsForm
                    currentTab={this.props.currentTab}
                    users={this.props.users}
                    projects={this.props.projects}
                    isLoading={this.props.isLoading}
                    displayError={this.props.displayError}
                    createUser={(user) => {
                        this.props.createUser(user, () => {
                            this.props.fetchUsers();
                        })
                    }}
                    updateUserStatus={(id, status) => {
                        this.props.updateUserStatus(id, status, () => {
                            this.props.fetchUsers();
                        })
                    }}
                    updateUserRole={(id, role) => {
                        this.props.updateUserRole(id, role, () => {
                            this.props.fetchUsers();
                        })
                    }}
                    projectsByUser={this.props.projectsByUser}
                    fetchProjectsByUser={(userId)=> {
                        this.props.fetchProjectsByUser(userId)
                    }}
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
        projects: projectSelectors.getAllProjects(state),
        projectsByUser: projectSelectors.getProjectsByUser(state),
        isLoading: userSelectors.usersIsFetching(state) || projectSelectors.projectsIsFetching(state)
    }
}



function mapDispatchToProps(dispatch: any): SettingsViewDispatchProps {
    return {
        fetchUsers: () => {
            dispatch(userActions.fetchUsers())
        },
        createUser: (user: UserRequest, okCallback?, errorCallback?) => {
            dispatch(userActions.createUser(user, okCallback, errorCallback))
        },
        fetchProjects: () => {
            dispatch(projectActions.fetchProjects())
        },
        fetchProjectsByUser: (userId: number, okCallback?, errorCallback?) => {
            dispatch(projectActions.fetchProjectsByUser(userId,okCallback,errorCallback))
        },
        updateUserStatus: (id: number, status: boolean, okCallback?, errorCallback?) => {
            dispatch(userActions.updateStatus(id, status, okCallback, errorCallback))
        },
        updateUserRole(id: number, role: SystemRole, okCallback?, errorCallback?): any {
            dispatch(userActions.updateRole(id, role, okCallback, errorCallback))
        },
        displayError: (msg: string) => {
            dispatch(notificationActions.error(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);