import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import * as React from "react";
import {Task, TaskRequest, TaskStatus} from "../../store/tasks/Types";
import TaskItem from "./TaskItem";
import {blue} from "@material-ui/core/colors";
import CreateTaskDialog from "./CreateTaskDialog";
import {User} from "../../store/users/Types";
import {Project} from "../../store/project/Types";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 ${grid / 2}px ${grid}px 0`,
    borderTopLeftRadius: `${grid}px`,
    borderTopRightRadius: `${grid}px`,
    borderBottomLeftRadius: `${grid}px`,
    borderBottomRightRadius: `${grid}px`,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',

    // change background colour if dragging
    background: '#fafafa',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: !isDraggingOver ? blue[50] : blue["A100"],

    minHeight: "210px",
    width: "100%",
    padding: grid,
    marginLeft: 10
});

export interface TaskBoardProps {
    users: User[],
    currentUser: string,
    tasksCreated: Task[],
    tasksInProgress: Task[],
    tasksReady: Task[],
    tasksDone: Task[],
    tasksOnTesting: Task[],

    displayError(msg: string): any,

    createTask(taskRequest: TaskRequest, okCallback?, errorCallback?): any,

    updateTaskStatus(id: number, status: TaskStatus, okCallback?, errorCallback?): any,

    displayWarning(msg: string): any
}

export interface TaskBoardState {
    createTaskOpen: boolean,
    sourceType: string,
    tasksCreated: Task[],
    tasksInProgress: Task[],
    tasksReady: Task[],
    tasksDone: Task[],
    tasksOnTesting: Task[]
}


class TaskBoard extends React.Component<TaskBoardProps, TaskBoardState> {
    constructor(props) {
        super(props);
        this.state = {
            createTaskOpen: false,
            sourceType: null,
            tasksCreated: this.props.tasksCreated,
            tasksInProgress: this.props.tasksInProgress,
            tasksReady: this.props.tasksReady,
            tasksDone: this.props.tasksDone,
            tasksOnTesting: this.props.tasksOnTesting
        };

    }

    componentDidUpdate(prevProps) {
        if (this.props.tasksCreated !== prevProps.tasksCreated || this.props.tasksInProgress !== prevProps.tasksInProgress ||
            this.props.tasksReady !== prevProps.tasksReady || this.props.tasksDone !== prevProps.tasksDone ||
            this.props.tasksOnTesting !== prevProps.tasksOnTesting) {
            this.setState({
                tasksCreated: this.props.tasksCreated,
                tasksInProgress: this.props.tasksInProgress,
                tasksReady: this.props.tasksReady,
                tasksDone: this.props.tasksDone,
                tasksOnTesting: this.props.tasksOnTesting
            })
        }
    }

    componentDidMount(): void {
        this.setState({
            tasksCreated: this.props.tasksCreated,
            tasksInProgress: this.props.tasksInProgress,
            tasksReady: this.props.tasksReady,
            tasksDone: this.props.tasksDone,
            tasksOnTesting: this.props.tasksOnTesting
        })
    }

    id2List = {
        tasksCreated: 'tasksCreated',
        tasksInProgress: 'tasksInProgress',
        tasksReady: 'tasksReady',
        tasksDone: 'tasksDone',
        tasksOnTesting: 'tasksOnTesting'
    };

    onDragStart = (start) => {
        const type = start.source.droppableId;
        this.setState({sourceType: type})
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    //
    move = (source, destination, droppableSource, droppableDestination, destinationDroppableId, sourceDroppableId) => {

        let destClone = Array.from(destination);
        let sourceClone = Array.from(source);

        console.log("destinationDroppableId " + destinationDroppableId)
        console.log("sourceDroppableId " + sourceDroppableId)

        if (!(destinationDroppableId === 'tasksCreated') &&
            ((sourceDroppableId === 'tasksCreated' && destinationDroppableId === 'tasksInProgress') ||
                (sourceDroppableId === 'tasksInProgress' && destinationDroppableId === 'tasksOnTesting') ||
                (sourceDroppableId === 'tasksInProgress' && destinationDroppableId === 'tasksReady') ||
                (sourceDroppableId === 'tasksOnTesting' && destinationDroppableId === 'tasksInProgress') ||
                (sourceDroppableId === 'tasksOnTesting' && destinationDroppableId === 'tasksReady') ||
                (sourceDroppableId === 'tasksReady' && destinationDroppableId === 'tasksDone'))) {
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            switch (destinationDroppableId) {
                case 'tasksInProgress':
                    this.props.updateTaskStatus(removed.id, TaskStatus.IN_PROGRESS);
                    break;
                case 'tasksReady':
                    this.props.updateTaskStatus(removed.id, TaskStatus.READY);
                    break;
                case 'tasksDone':
                    this.props.updateTaskStatus(removed.id, TaskStatus.DONE);
                    break;
                case 'tasksOnTesting':
                    this.props.updateTaskStatus(removed.id, TaskStatus.ON_TESTING);
                    break;
                default:
                    break;
            }
        }
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    getList = (id) => this.state[this.id2List[id]];

    onDragEnd = (result) => {
        this.setState({sourceType: null})

        const {source, destination} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const tasksCreated = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {tasksCreated};

            if (source.droppableId === 'tasksInProgress') {
                state = {tasksInProgress: tasksCreated};
            }

            if (source.droppableId === 'tasksReady') {
                state = {tasksReady: tasksCreated};
            }

            if (source.droppableId === 'tasksDone') {
                state = {tasksDone: tasksCreated};
            }
            if (source.droppableId === 'tasksOnTesting') {
                state = {tasksOnTesting: tasksCreated};
            }

            this.setState(state);
        } else {
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination,
                destination.droppableId,
                source.droppableId
            );

            this.setState(result)
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.createTaskOpen && <CreateTaskDialog
                    displayError={this.props.displayError}
                    users={this.props.users}
                    reporterLogin={this.props.currentUser}
                    onClose={((value, taskRequest) => {
                        if (value === 'Ok' && taskRequest) {
                            console.log(taskRequest)
                            this.props.createTask(taskRequest)
                        }
                    })}
                    close={(value) => {
                        this.setState({createTaskOpen: value})
                    }}
                />}

                <Button
                    style={{margin: 12}}
                    variant={"contained"}
                    color={"primary"}
                    onClick={(e) => this.setState({createTaskOpen: true})}
                >
                    Создать задачу
                </Button>
                <Grid container style={{
                    display: "flex",
                    justifyContent: "space-between",
                    overflow: 'auto'
                }}>
                    <Paper style={{margin: 6, padding: 12, overflow: 'auto', width: '100%'}}>
                        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                            <Grid container direction={"row"}>
                                <Grid item style={{minWidth: "290px", marginRight: 8, marginLeft: 20}}>
                                    <Typography style={{textAlign: "center"}}>
                                        <b>СОЗДАНО</b>
                                    </Typography>
                                    <Droppable
                                        droppableId="tasksCreated"
                                        isDropDisabled={this.state.sourceType !== 'tasksCreated'}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasksCreated?.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style,
                                                                        )}>
                                                                        <TaskItem task={item}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                                <Grid item style={{minWidth: "290px", marginRight: 8}}>
                                    <Typography style={{textAlign: "center"}}>
                                        <b>В РАБОТЕ</b>
                                    </Typography>
                                    <Droppable
                                        droppableId="tasksInProgress"
                                        isDropDisabled={(this.state.sourceType !== 'tasksOnTesting') && (this.state.sourceType !== 'tasksCreated') &&
                                                 (this.state.sourceType !== 'tasksInProgress')}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasksInProgress.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style,
                                                                        )}>
                                                                        <TaskItem task={item}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                                <Grid item style={{minWidth: "290px", marginRight: 8}}>
                                    <Typography style={{textAlign: "center"}}>
                                        <b>НА ТЕСТИРОВАНИИ</b>
                                    </Typography>
                                    <Droppable
                                        droppableId="tasksOnTesting"
                                        isDropDisabled={(this.state.sourceType !== 'tasksInProgress') && (this.state.sourceType !== 'tasksOnTesting')}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasksOnTesting.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style,
                                                                        )}>
                                                                        <TaskItem task={item}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                                <Grid item style={{minWidth: "290px", marginRight: 8}}>
                                    <Typography style={{textAlign: "center"}}>
                                        <b>ГОТОВО</b>
                                    </Typography>
                                    <Droppable
                                        droppableId="tasksReady"
                                        isDropDisabled={(this.state.sourceType !== 'tasksOnTesting') && (this.state.sourceType !== 'tasksInProgress') &&
                                        (this.state.sourceType !== 'tasksReady')}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasksReady.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        <TaskItem task={item}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                                <Grid item style={{minWidth: "290px"}}>
                                    <Typography style={{textAlign: "center"}}>
                                        <b>ЗАКРЫТО</b>
                                    </Typography>
                                    <Droppable
                                        droppableId="tasksDone"
                                        isDropDisabled={(this.state.sourceType !== 'tasksReady') && (this.state.sourceType !== 'tasksDone')}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasksDone.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style,
                                                                        )}>
                                                                        <TaskItem task={item}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                            </Grid>
                        </DragDropContext>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }
}

export default TaskBoard;
