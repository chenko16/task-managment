import {SystemRole, User} from "../../store/users/Types";
import {Release} from "../../store/releases/Types";
import * as React from "react";
import * as authSelectors from "../../store/auth/Reducer";
import * as notificationActions from "../../store/notification/Actions";
import * as userSelectors from "../../store/users/Reducer";
import * as userActions from "../../store/users/Actions";
import * as projectSelectors from "../../store/project/Reducer";
import * as projectActions from "../../store/project/Actions";
import * as taskActions from "../../store/tasks/Actions";
import * as taskSelectors from "../../store/tasks/Reducer";
import {connect} from "react-redux";
import {ReactRouterProps} from 'react-router-dom';
import {Task} from "../../store/tasks/Types";
import {withRouter} from "react-router";
import {RouteProps} from 'react-router-dom';
import {Project} from "../../store/project/Types";
import TaskView from "../../components/tasks/TaskView";
import {Grid} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

interface TaskInfoViewProps {
    role: SystemRole,
    currentUser: string,
    task?: Task,
    isLoading: boolean,
    projects: Project[],
    users: User[],
}

interface TaskInfoViewDispatchProps {
    displayError(msg): any,

    fetchTask(id: number, okCallback?, errorCallback?): any,

    setAssignee (id: number, userId: number, okCallback?, errorCallback?): any,

    fetchProjects(): any,

    fetchTasks(): any,

    fetchUsers(): any
}

interface TaskInfoViewState {
}

class TaskInfoView extends React.Component<TaskInfoViewProps & TaskInfoViewDispatchProps & ReactRouterProps & RouteProps, TaskInfoViewState> {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.fetchTask(id);
    }

    render(): React.ReactNode {
        console.log(this.props.task)

        console.log(JSON.stringify(this.props, null, 4));

        if (this.props.isLoading) {
            return this.renderLoader();
        } else {
            return (
                <React.Fragment>
                    <TaskView
                        currentUserId={this.props.users.filter((user) => {return user.login === this.props.currentUser})[0].id}
                        setAssignee={(id, userId) => {
                            this.props.setAssignee(id, userId, () => {
                                this.props.fetchTask(id);
                            })
                        }}
                        task={this.props.task}
                    />
                </React.Fragment>
            )
        }
    }

    renderLoader() {
        return (
            <Grid container style={{width: "100%", marginTop: 32, paddingBottom: 32}} justify="center"
                  alignItems="center">
                <Grid item>
                    <CircularProgress disableShrink/>
                </Grid>
            </Grid>
        )
    }
}


function mapStateToProps(state): TaskInfoViewProps {
    return {
        role: authSelectors.getRole(state),
        currentUser: authSelectors.username(state),
        task: taskSelectors.getTask(state),
        users: userSelectors.getAllUsers(state),
        isLoading: taskSelectors.getCurrentTaskLoading(state),
        projects: projectSelectors.getAllProjects(state)
    }
}

function mapDispatchToProps(dispatch: any): TaskInfoViewDispatchProps {
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
        fetchTask(id: number, okCallback?, errorCallback?): any {
            dispatch(taskActions.fetchTask(id, okCallback, errorCallback))
        },
        setAssignee(id: number, userId: number, okCallback?, errorCallback?): any {
            dispatch(taskActions.setAssignee(id, userId, okCallback, errorCallback))
        },
        fetchTasks(): any {
            dispatch(taskActions.fetchTasks())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskInfoView));
