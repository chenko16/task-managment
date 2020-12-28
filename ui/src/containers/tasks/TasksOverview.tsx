import * as React from "react";
import * as notificationActions from "../../store/notification/Actions";
import * as userSelectors from "../../store/users/Reducer";
import * as userActions from "../../store/users/Actions";
import {connect} from "react-redux";
import TaskBoard from "../../components/tasks/TaskBoard";
import {Task, TaskRequest, TaskStatus, TaskType} from "../../store/tasks/Types";
import {User} from "../../store/users/Types";
import * as authSelectors from "../../store/auth/Reducer";
import * as taskActions from "../../store/tasks/Actions";
import * as taskSelectors from "../../store/tasks/Reducer";


export interface TasksOverviewProps {

}

export interface TasksOverviewDispatchProps {
    displayError(msg: string): any,

    displayWarning(msg: string): any,

    fetchUsers(): any,

    createTask(taskRequest: TaskRequest, okCallback?, errorCallback?): any,

    updateTaskStatus (id: number, status: TaskStatus, okCallback?, errorCallback?): any,

    fetchTasks(): any
}

export interface TasksOverviewState {
    tasks: Task[]
}

export interface TasksOverviewStateProps {
    users: User[],
    tasks: Task[],
    currentUser: string
}

class TasksOverview extends React.Component<TasksOverviewDispatchProps & TasksOverviewProps & TasksOverviewStateProps, TasksOverviewState> {
    constructor(props) {
        super(props);
        this.props.fetchUsers();
        this.props.fetchTasks();

        let task1: Task = {
            id: 1,
            title: "task1",
            description: "description of task1",
            status: TaskStatus.CREATED,
            type: TaskType.STORY,
            reporter: this.props.users[0],
        }
        let task2: Task = {
            id: 2,
            title: "task2",
            description: "description of task2",
            status: TaskStatus.DONE,
            type: TaskType.STORY,
            reporter: this.props.users[2],
        }
        let task3: Task = {
            id: 3,
            title: "task3",
            description: "description of task3",
            status: TaskStatus.IN_PROGRESS,
            type: TaskType.STORY,
            reporter: this.props.users[1],
        }
        let task4: Task = {
            id: 4,
            title: "task4",
            description: "description of task4",
            status: TaskStatus.CREATED,
            type: TaskType.TASK,
            reporter: this.props.users[0],
        }
        let task5: Task = {
            id: 5,
            title: "task5",
            description: "description of task3",
            status: TaskStatus.READY,
            type: TaskType.BUG,
            reporter: this.props.users[3],
        }
        let tasks: Task[] = [];
        tasks.push(task1,  task2, task3, task4, task5);
        this.state= {
            tasks : tasks
        };
        this.refetchTasks = this.refetchTasks.bind(this);
    }

    refetchTasks() {
        this.props.fetchTasks();
        this.setState({tasks: this.props.tasks})
    }

    render(): React.ReactNode {
        return (
            <TaskBoard
                currentUser={this.props.currentUser}
                users={this.props.users}
                updateTaskStatus={(id, status) => {
                    this.props.updateTaskStatus(id,status, () => {
                        this.refetchTasks();
                    })
                }}
                createTask={taskRequest => {
                    this.props.createTask(taskRequest, () => {
                        this.refetchTasks();
                    })
                }}
                displayError={this.props.displayError}
                displayWarning={this.props.displayWarning}
                tasksCreated={this.props.tasks.filter(task => { return task.status === TaskStatus.CREATED})}
                tasksInProgress={this.props.tasks.filter(task => { return task.status === TaskStatus.IN_PROGRESS})}
                tasksDone={this.props.tasks.filter(task => { return task.status === TaskStatus.DONE})}
                tasksOnTesting={this.props.tasks.filter(task => { return task.status === TaskStatus.ON_TESTING})}
                tasksReady={this.props.tasks.filter(task => { return task.status === TaskStatus.READY})}
            />
        )
    }
}


function mapStateToProps(state): TasksOverviewStateProps {
    return {
        users: userSelectors.getAllUsers(state),
        currentUser: authSelectors.username(state),
        tasks: taskSelectors.getTasks(state)
    }
}


function mapDispatchToProps(dispatch: any): TasksOverviewDispatchProps {
    return {
        displayWarning(msg: string): any {
            dispatch(notificationActions.warning(msg))
        },
        fetchUsers(): any {
            dispatch(userActions.fetchUsers())
        },
        displayError: (msg: string) => {
            dispatch(notificationActions.error(msg))
        },
        createTask(taskRequest: TaskRequest, okCallback?, errorCallback?): any {
            dispatch(taskActions.createTask(taskRequest, okCallback, errorCallback))
        },
        updateTaskStatus(id: number, status: TaskStatus, okCallback?, errorCallback?): any {
            dispatch(taskActions.updateTaskStatus(id, status, okCallback, errorCallback))
        },
        fetchTasks(): any {
            dispatch(taskActions.fetchTasks())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksOverview);
