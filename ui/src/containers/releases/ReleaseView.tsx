import {SystemRole, User} from "../../store/users/Types";
import {Release} from "../../store/releases/Types";
import * as React from "react";
import * as authSelectors from "../../store/auth/Reducer";
import * as notificationActions from "../../store/notification/Actions";
import * as releasesActions from "../../store/releases/Actions";
import * as releasesSelectors from "../../store/releases/Reducer";
import * as userSelectors from "../../store/users/Reducer";
import * as userActions from "../../store/users/Actions";
import * as projectSelectors from "../../store/project/Reducer";
import * as projectActions from "../../store/project/Actions";
import * as taskActions from "../../store/tasks/Actions";
import * as taskSelectors from "../../store/tasks/Reducer";
import {connect} from "react-redux";
import {ReactRouterProps} from 'react-router-dom';
import {ReleaseViewForm} from "../../components/releases/ReleaseViewForm";
import {Task} from "../../store/tasks/Types";
import {withRouter} from "react-router";
import {RouteProps} from 'react-router-dom';
import {Project} from "../../store/project/Types";

interface ReleaseViewProps {
    role: SystemRole,
    currentUser: string,
    release?: Release,
    projects: Project[],
    users: User[],
    tasks: Task[],
}

interface ReleaseViewDispatchProps {
    displayError(msg): any,

    fetchRelease(id: number, okCallback?, errorCallback?): any,

    updateDescription(id: number, description: string, okCallback?, errorCallback?): any,

    finishRelease(id: number, okCallback?, errorCallback?): any,

    deleteRelease(id: number, okCallback?, errorCallback?): any,

    fetchProjects(): any,

    addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    fetchTasks(): any,

    fetchUsers(): any
}

interface ReleaseViewState {
    tasks: Task[]
}

class ReleaseView extends React.Component<ReleaseViewProps & ReleaseViewDispatchProps & ReactRouterProps & RouteProps, ReleaseViewState> {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.fetchRelease(id);
        let task1: Task = {
            title: "task1",
            description: "description of task1"
        };
        let task2: Task = {
            title: "task2",
            description: "description of task2"
        };
        let task3: Task = {
            title: "task3",
            description: "description of task3"
        };
        let tasks: Task[] = [];
        tasks.push(task1, task2, task3);
        this.state = {
            tasks: tasks
        }
    }

    render(): React.ReactNode {
        console.log(this.props.release)
        return (
            <React.Fragment>
                <ReleaseViewForm
                    addTaskToRelease={(releaseId, taskId) => {
                        this.props.addTaskToRelease(releaseId,taskId,() => {
                            this.props.fetchRelease(releaseId)
                        })
                    }}
                    deleteTaskFromRelease={(releaseId, taskId) => {
                        this.props.deleteTaskFromRelease(releaseId,taskId,() => {
                            this.props.fetchRelease(releaseId)
                        })
                    }}
                    displayError={this.props.displayError}
                    users={this.props.users}
                    projects={this.props.projects}
                    updateDescription={(id, description) => {
                        this.props.updateDescription(id, description, () => {
                            this.props.fetchRelease(id);
                        })
                    }}
                    deleteRelease={(id) => {
                        this.props.deleteRelease(id, () => {
                            this.props.history.push("/releases")
                        })
                    }}
                    finishRelease={(id) => {
                        this.props.finishRelease(id, () => {
                            this.props.fetchRelease(id);
                        })
                    }}
                    tasks={this.props.tasks}
                    release={this.props.release}
                />
            </React.Fragment>
        )
    }
}


function mapStateToProps(state): ReleaseViewProps {
    return {
        role: authSelectors.getRole(state),
        currentUser: authSelectors.username(state),
        release: releasesSelectors.getRelease(state),
        users: userSelectors.getAllUsers(state),
        projects: projectSelectors.getAllProjects(state),
        tasks: taskSelectors.getTasks(state)
    }
}

function mapDispatchToProps(dispatch: any): ReleaseViewDispatchProps {
    return {
        displayError: (error) => {
            dispatch(notificationActions.error(error));
        },
        fetchProjects(): any {
            dispatch(projectActions.fetchProjects())
        },
        fetchUsers(): any {
            dispatch(userActions.fetchUsers())
        },
        fetchRelease(id: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.fetchRelease(id, okCallback, errorCallback))
        },
        updateDescription(id: number, description: string, okCallback?, errorCallback?): any {
            dispatch(releasesActions.updateDescription(id, description, okCallback, errorCallback))
        },
        deleteRelease(id: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.deleteRelease(id, okCallback, errorCallback))
        },
        finishRelease(id: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.finishRelease(id, okCallback, errorCallback))
        },
        fetchTasks(): any {
            dispatch(taskActions.fetchTasks())
        },
        deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.deleteTaskFromRelease(releaseId, taskId, okCallback, errorCallback))
        },
        addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.addTaskToRelease(releaseId, taskId, okCallback, errorCallback))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleaseView));
