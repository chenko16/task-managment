import * as React from 'react';
import {SystemRole, User, UserRequest} from '../../store/users/Types';
import UsersForm from '../users/UsersForm';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import {AppBar, Grid, Tab, Tabs} from '@material-ui/core';
import {BusinessRole, Project, ProjectRequest, ProjectsByUsers, UserProject} from '../../store/project/Types';
import ProjectsForm from '../projects/ProjectsForm';


export interface SettingsFormProps {
    users: User[],
    projects: Project[],
    participants?: UserProject[],
    userRoleProjects: Project[],
    projectsByUser: ProjectsByUsers | undefined,
    isLoading: boolean,
    currentTab?: number,
    openEditProject: boolean,
    currentProject?: Project,
    role: SystemRole,
    currentUser: string,

    openEditProjectChanged (openEditProject) : any,

    currentProjectChanged (currentProject) : any,

    displayError(errorMessage: string): any,

    createUser(user: UserRequest): any,

    deleteUser(id: number, okCallback?, errorCallback?): any,

    updateUserStatus(id: number, status: boolean): any,

    updateUserRole(id: number, role: SystemRole): any,

    fetchProjectsByUser(userId: number, okCallback?, errorCallback?): any,

    createProject(project: ProjectRequest, okCallback?, errorCallback?): any,

    updateDescription(id: number, description: string, okCallback?, errorCallback?): any,

    updateAssignee(id: number, userId: number, okCallback?: (project: Project) => void, errorCallback?): any,

    updateReporter(id: number, userId: number, okCallback?, errorCallback?): any,

    updateProjectStatus(id: number, status: boolean, okCallback?, errorCallback?): any,

    addParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    deleteParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    setParticipantRole(id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?): any,

    getParticipants(id: number, okCallback?, errorCallback?): any,

    fetchProject(id: number, okCallback?, errorCallback?): any,

    deleteProject (id: number, okCallback?, errorCallback?): any,

    fetchProjects(): any
}

export interface SettingsFormState {
    currentTab: number
}

export class SettingsForm extends React.Component<SettingsFormProps, SettingsFormState> {

    schemeParts: Array<any>

    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.currentTab ? this.props.currentTab : 0
        }
    }

    buildParts() {
        this.schemeParts = [
            {
                name: 'Проекты',
                value: <ProjectsForm
                    role={this.props.role}
                    currentUser={this.props.currentUser}
                    currentProject={this.props.currentProject}
                    userRoleProjects={this.props.userRoleProjects}
                    currentProjectChanged={this.props.currentProjectChanged}
                    participants={this.props.participants}
                    addParticipant={this.props.addParticipant}
                    deleteParticipant={this.props.deleteParticipant}
                    getParticipants={this.props.getParticipants}
                    setParticipantRole={this.props.setParticipantRole}
                    updateProjectStatus={this.props.updateProjectStatus}
                    updateAssignee={this.props.updateAssignee}
                    updateDescription={this.props.updateDescription}
                    updateReporter={this.props.updateReporter}
                    createProject={this.props.createProject}
                    fetchProjects={this.props.fetchProjects}
                    fetchProject={this.props.fetchProject}
                    deleteProject={this.props.deleteProject}
                    fetchProjectsByUser={this.props.fetchProjectsByUser}
                    users={this.props.users}
                    projects={this.props.projects}
                    displayError={this.props.displayError}
                    openEditProject={this.props.openEditProject}
                    openEditProjectChanged={this.props.openEditProjectChanged}
                />,
                icon: <FolderIcon/>
            },
            {
                name: 'Пользователи',
                value: <UsersForm
                    role={this.props.role}
                    users={this.props.users}
                    projects={this.props.projects}
                    userProjects={this.props.projectsByUser}
                    fetchProjectsByUser={(userId) => {
                        this.props.fetchProjectsByUser(userId)
                    }}
                    isLoading={this.props.isLoading}
                    displayError={this.props.displayError}
                    createUser={(user) => {
                        this.props.createUser(user)
                    }}
                    deleteUser={this.props.deleteUser}
                    updateUserStatus={(id, status) => {
                        this.props.updateUserStatus(id, status)
                    }}
                    updateUserRole={(id, role) => {
                        this.props.updateUserRole(id, role)
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
                <Grid container justify='center'>
                    <Grid spacing={2} style={{width: '100%', marginTop: 12}}>
                        <Grid item xs={6} style={{maxWidth: '100%'}}>
                            <AppBar position='static'>
                                <Tabs
                                    style={{maxWidth: '500'}}
                                    centered
                                    value={this.state.currentTab}
                                    onChange={(event, value) => {
                                        this.setState({currentTab: value})
                                    }}
                                >
                                    {this.schemeParts.map((part, index) => {
                                        if (index !== this.schemeParts.length &&
                                            !(!(this.props.role === SystemRole.ADMIN) && index === 1))
                                        return <Tab label={part.name} icon={part.icon}/>
                                    })}
                                </Tabs>
                            </AppBar>
                        </Grid>
                    </Grid>
                    <Grid spacing={2} style={{width: '100%', marginTop: 12}}>
                        <Grid item xs={10} style={{maxWidth: '100%'}}>
                            {this.schemeParts[this.state.currentTab].value}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
