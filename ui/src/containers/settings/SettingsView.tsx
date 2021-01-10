import * as React from 'react';
import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as authSelectors from '../../store/auth/Reducer';
import * as userSelectors from '../../store/users/Reducer';
import * as userActions from '../../store/users/Actions';
import * as projectSelectors from '../../store/project/Reducer';
import * as projectActions from '../../store/project/Actions';
import * as notificationActions from '../../store/notification/Actions';
import {connect} from 'react-redux';
import {SystemRole, User, UserRequest} from '../../store/users/Types';
import {SettingsForm} from '../../components/settings/SettingsForm';
import {
    BusinessRole,
    Project,
    ProjectRequest,
    ProjectsByUsers,
    UserProject
} from '../../store/project/Types';

export interface SettingsViewDispatchProps {
    displayError(msg: string): any,

    fetchUsers(): any,

    createUser(user: UserRequest, okCallback?, errorCallback?): any,

    deleteUser(id: number, okCallback?, errorCallback?): any,

    updateUserStatus(id: number, status: boolean, okCallback?, errorCallback?): any,

    updateUserRole(id: number, role: SystemRole, okCallback?, errorCallback?): any,

    fetchProjects(): any,

    fetchProjectsByUser(userId: number, okCallback?, errorCallback?): any,

    createProject(project: ProjectRequest, okCallback?, errorCallback?): any,

    updateDescription(id: number, description: string, okCallback?, errorCallback?): any,

    updateAssignee(id: number, userId: number, okCallback?, errorCallback?): any,

    updateReporter(id: number, userId: number, okCallback?, errorCallback?): any,

    addParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    deleteParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    setParticipantRole(id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?): any,

    getParticipants(id: number, okCallback?, errorCallback?): any,

    updateProjectStatus(id: number, status: boolean, okCallback?, errorCallback?): any,

    deleteProject(id: number, okCallback?, errorCallback?): any,

    fetchProject(id: number, okCallback?, errorCallback?): any
}

export interface SettingsViewStateProps {
    users: User[],
    projects: Project[],
    role: SystemRole,
    currentUser: string,
    projectsByUser: ProjectsByUsers | undefined,
    isLoading: boolean,
    participants: UserProject[] | undefined
}

export interface SettingsViewProps {
    currentTab?: number
}

export interface SettingsViewState {
    openEditProject: boolean,
    currentProject?: Project
}

class SettingsView extends React.Component<SettingsViewStateProps & SettingsViewDispatchProps & SettingsViewProps, SettingsViewState> {
    constructor(props) {
        super(props);
        this.state = {
            openEditProject: false
        }
        this.props.fetchUsers();
        this.props.fetchProjects();
    }

    getUserRoleProjects(userProjects: ProjectsByUsers, projects: Project[]): Project[] {
        let projectIds: number[] = [];
        userProjects?.reporters?.forEach((id) => {
            if (projectIds.filter(projectId => {
                return projectId === id
            }).length === 0) {
                projectIds.push(id)
            }
        })
        userProjects?.assignee?.forEach((id) => {
            if (projectIds.filter(projectId => {
                return projectId === id
            }).length === 0) {
                projectIds.push(id)
            }
        })
        userProjects?.participants?.forEach((role) => {
            if (projectIds.filter((id) => {
                return id === role.projectId
            }).length === 0) {
                projectIds.push(role.projectId);
            }
        })
        let projectsRes = projects.filter(project => {
            return projectIds.some((id) => id === project.id)
        })
        return projectsRes;
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
                    role={this.props.role}
                    currentUser={this.props.currentUser}
                    userRoleProjects={this.getUserRoleProjects(this.props.projectsByUser, this.props.projects)}
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
                    deleteUser={(id) => {
                        this.props.deleteUser(id, () => {
                            this.props.fetchUsers();
                        })
                    }}
                    projectsByUser={this.props.projectsByUser}
                    fetchProjectsByUser={(userId) => {
                        this.props.fetchProjectsByUser(userId)
                    }}
                    updateAssignee={this.props.updateAssignee}
                    updateDescription={this.props.updateDescription}
                    deleteProject={(projectId) => {
                        this.props.deleteProject(projectId, () => {
                            this.props.fetchProjects();
                        })
                    }}
                    updateReporter={this.props.updateReporter}
                    updateProjectStatus={(projectId, status) => {
                        this.props.updateProjectStatus(projectId, status, () => {
                            this.props.fetchProjects();
                        })
                    }}
                    fetchProject={this.props.fetchProject}
                    openEditProject={this.state.openEditProject}
                    openEditProjectChanged={(openEditProject) => {
                        this.setState({openEditProject: openEditProject})
                    }}
                    currentProject={this.state.currentProject}
                    currentProjectChanged={(currentProject) => {
                        this.setState({currentProject: currentProject})
                    }}
                    participants={this.props.participants}
                    addParticipant={this.props.addParticipant}
                    deleteParticipant={this.props.deleteParticipant}
                    getParticipants={this.props.getParticipants}
                    setParticipantRole={this.props.setParticipantRole}
                    createProject={this.props.createProject}
                    fetchProjects={this.props.fetchProjects}
                />
            </React.Fragment>
        )
    }


    renderLoader() {
        return (
            <Grid container style={{width: '100%', marginTop: 32, paddingBottom: 32}} justify='center'
                  alignItems='center'>
                <Grid item>
                    <CircularProgress disableShrink/>
                </Grid>
            </Grid>
        )
    }

}


function mapStateToProps(state): SettingsViewStateProps {
    return {
        users: userSelectors.getAllUsers(state),
        projects: projectSelectors.getAllProjects(state),
        projectsByUser: projectSelectors.getProjectsByUser(state),
        isLoading: userSelectors.usersIsFetching(state) || projectSelectors.projectsIsFetching(state),
        participants: projectSelectors.getParticipants(state),
        currentUser: authSelectors.username(state),
        role: authSelectors.getRole(state)
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
            dispatch(projectActions.fetchProjectsByUser(userId, okCallback, errorCallback))
        },
        updateUserStatus: (id: number, status: boolean, okCallback?, errorCallback?) => {
            dispatch(userActions.updateStatus(id, status, okCallback, errorCallback))
        },
        updateUserRole(id: number, role: SystemRole, okCallback?, errorCallback?): any {
            dispatch(userActions.updateRole(id, role, okCallback, errorCallback))
        },
        deleteUser(id: number, okCallback?, errorCallback?): any {
            dispatch(userActions.deleteUser(id, okCallback, errorCallback))
        },
        getParticipants(id: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.getParticipants(id, okCallback, errorCallback))
        },
        setParticipantRole(id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?): any {
            dispatch(projectActions.setParticipantRole(id, userId, role, okCallback, errorCallback))
        },
        addParticipant(id: number, userId: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.addParticipant(id, userId, okCallback, errorCallback))
        },
        deleteParticipant(id: number, userId: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.deleteParticipant(id, userId, okCallback, errorCallback))
        },
        updateDescription(id: number, description: string, okCallback?, errorCallback?): any {
            dispatch(projectActions.updateDescription(id, description, okCallback, errorCallback))
        },
        updateAssignee(id: number, userId: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.updateAssignee(id, userId, okCallback, errorCallback))
        },
        updateReporter(id: number, userId: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.updateReporter(id, userId, okCallback, errorCallback))
        },
        updateProjectStatus(id: number, status: boolean, okCallback?, errorCallback?): any {
            dispatch(projectActions.updateProjectStatus(id, status, okCallback, errorCallback))
        },
        createProject(project: ProjectRequest, okCallback?, errorCallback?): any {
            dispatch(projectActions.createProject(project, okCallback, errorCallback))
        },
        fetchProject(id: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.fetchProject(id, okCallback, errorCallback))
        },
        deleteProject(id: number, okCallback?, errorCallback?): any {
            dispatch(projectActions.deleteProject(id, okCallback, errorCallback))
        },
        displayError: (msg: string) => {
            dispatch(notificationActions.error(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
