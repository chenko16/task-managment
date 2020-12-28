import * as React from "react";
import {SystemRole, User} from "../../store/users/Types";
import {Project} from "../../store/project/Types";
import * as userSelectors from "../../store/users/Reducer";
import * as projectSelectors from "../../store/project/Reducer";
import * as userActions from "../../store/users/Actions";
import * as projectActions from "../../store/project/Actions";
import * as notificationActions from "../../store/notification/Actions";
import * as releasesActions from "../../store/releases/Actions";
import * as releasesSelectors from "../../store/releases/Reducer";
import * as authSelectors from "../../store/auth/Reducer";
import * as taskActions from "../../store/tasks/Actions";
import * as taskSelectors from "../../store/tasks/Reducer";
import {connect} from "react-redux";
import {Release, ReleaseRequest} from "../../store/releases/Types";
import ReleasesOverviewForm from "../../components/releases/ReleasesOverviewForm";
import {Task} from "../../store/tasks/Types";


export interface ReleasesViewDispatchProps {
    displayError(msg: string): any,

    fetchUsers(): any,

    fetchProjects(): any,

    fetchReleases(): any,

    createRelease(release: ReleaseRequest, okCallback?, errorCallback?): any,

    addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    fetchTasks(): any
}

export interface ReleasesViewStateProps {
    users: User[],
    projects: Project[],
    releases: Release[],
    role: SystemRole,
    currentUser: string,
    tasks: Task[],

    isLoading: boolean
}

export interface ReleasesViewProps {

}

export interface ReleasesViewState {

}

class ReleasesView extends React.Component<ReleasesViewProps & ReleasesViewDispatchProps & ReleasesViewStateProps, ReleasesViewState> {
    constructor(props) {
        super(props);
        this.props.fetchReleases();
        this.props.fetchProjects();
        this.props.fetchUsers();
        this.props.fetchTasks();
    }

    render(): React.ReactNode {
        console.log(this.props)
        return (
            <React.Fragment>
                <ReleasesOverviewForm
                    addTaskToRelease={this.props.addTaskToRelease}
                    deleteTaskFromRelease={this.props.deleteTaskFromRelease}
                    tasks={this.props.tasks}
                    currentUser={this.props.currentUser}
                    role={this.props.role}
                    users={this.props.users}
                    projects={this.props.projects}
                    releases={this.props.releases}
                    displayError={this.props.displayError}
                    fetchReleases={this.props.fetchReleases}
                    createRelease={(releaseRequest) => {
                        this.props.createRelease(releaseRequest, () => {
                            this.props.fetchReleases();
                        })
                    }}
                />
            </React.Fragment>
        )
    }

}

function mapStateToProps(state): ReleasesViewStateProps {
    return {
        users: userSelectors.getAllUsers(state),
        projects: projectSelectors.getAllProjects(state),
        releases: releasesSelectors.getReleases(state),
        isLoading: userSelectors.usersIsFetching(state) || projectSelectors.projectsIsFetching(state),
        role: authSelectors.getRole(state),
        currentUser: authSelectors.username(state),
        tasks: taskSelectors.getTasks(state)
    }
}


function mapDispatchToProps(dispatch: any): ReleasesViewDispatchProps {
    return {
        fetchUsers: () => {
            dispatch(userActions.fetchUsers())
        },
        fetchProjects: () => {
            dispatch(projectActions.fetchProjects())
        },
        fetchReleases(): any {
            dispatch(releasesActions.fetchReleases())
        },
        fetchTasks(): any {
            dispatch(taskActions.fetchTasks())
        },
        createRelease(release: ReleaseRequest, okCallback?, errorCallback?): any {
            dispatch(releasesActions.createRelease(release, okCallback, errorCallback))
        },
        deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.deleteTaskFromRelease(releaseId, taskId, okCallback, errorCallback))
        },
        addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any {
            dispatch(releasesActions.addTaskToRelease(releaseId, taskId, okCallback, errorCallback))
        },
        displayError: (msg: string) => {
            dispatch(notificationActions.error(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesView);
