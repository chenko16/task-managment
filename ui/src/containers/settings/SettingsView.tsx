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
    projects: Project[],
    projectsByUser: ProjectsByUsers
}

class SettingsView extends React.Component<SettingsViewStateProps & SettingsViewDispatchProps & SettingsViewProps, SettingsViewState>{
    constructor(props) {
        super(props);


        let project1: Project = {
            id: 1,
            reporter: this.props.users[0],
            assignee: this.props.users[1],
            name: "teamMinato",
            description:"i will always watch after you",
            active: true
        };

        let project2: Project = {
            id: 2,
            reporter: this.props.users[2],
            assignee: this.props.users[0],
            name: "teamHatake",
            description: "team7 <3",
            active: true
        };

        let project3: Project = {
            id: 3,
            reporter: this.props.users[1],
            assignee: this.props.users[2],
            name: "teamUchiha",
            description: "any tehnique is worthless before my eyes",
            active: false
        };

        let projects: Project[] = [];
        projects.push(project1, project2, project3);

        let roleInProject1: RoleInProject = {
            projectId: 1,
            role: BusinessRole.DEVELOPER
        }

        let roleInProject2: RoleInProject = {
            projectId: 2,
            role: BusinessRole.LEADER
        }

        let roleInProject3: RoleInProject = {
            projectId: 3,
            role: BusinessRole.DEVOPS
        }

        let roleInProjects: RoleInProject[] = [];
        roleInProjects.push(roleInProject1, roleInProject2, roleInProject3);

        let projectsByUsers: ProjectsByUsers = {
            assignee: [1, 2],
            reporters: [3],
            participants: roleInProjects
        }

        this.state = {
            projects: projects,
            projectsByUser: projectsByUsers
        }

        this.props.fetchUsers();
        this.props.fetchProjects();
    }

    render(): React.ReactNode {
        if (this.props.isLoading)
            return this.renderLoader();

        console.log(JSON.stringify(this.props, null, 2));
        return (
            <React.Fragment>
                <SettingsForm
                    currentTab={this.props.currentTab}
                    users={this.props.users}
                    // projects={this.props.projects}
                    projects={this.state.projects}
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
                    // projectsByUser={this.props.projectsByUser}
                    projectsByUser={this.state.projectsByUser}
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