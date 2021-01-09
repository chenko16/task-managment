import * as React from 'react';
import Draggable from 'react-draggable';
import {ResizableBox} from 'react-resizable';
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Paper,
    Select,
    TextField,
    withStyles
} from '@material-ui/core';
import {User} from '../../store/users/Types';
import {UserService} from '../../services/UserService';
import {TaskRequest, TaskStatus, TaskType} from '../../store/tasks/Types';
import {Autocomplete} from '@material-ui/lab';

const styles = theme => createStyles({
    resizable: {
        position: 'relative',
        '& .react-resizable-handle': {
            position: 'absolute',
            width: 20,
            height: 20,
            bottom: 0,
            right: 0,
            background:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
            'background-position': 'bottom right',
            padding: '0 3px 3px 0',
            'background-repeat': 'no-repeat',
            'background-origin': 'content-box',
            'box-sizing': 'border-box',
            cursor: 'se-resize'
        }
    }
});

function PaperComponent(props) {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export interface CreateTaskDialogProps {
    users: User[],
    reporterLogin: string,

    displayError(errorMessage: string): any,

    onClose(value: string, taskRequest?: TaskRequest): any,

    close(value: boolean): any
}

export interface CreateTaskDialogState {
    taskTypes: TaskType[],
    taskType?: TaskType,
    title: string,
    description: string,
    assigneeLogin: string,
    assignee: User,
    reporterLogin: string,
    reporter: User
}

class CreateTaskDialog extends React.Component<CreateTaskDialogProps, CreateTaskDialogState> {
    constructor(props) {
        super(props);
        let taskTypes: Array<TaskType> = new Array<TaskType>();
        for (let type in TaskType)
            taskTypes.push(type as TaskType);
        this.state = {
            taskTypes: taskTypes,
            taskType: taskTypes[0],
            title: '',
            description: '',
            assigneeLogin: '',
            assignee: UserService.getEmptyUser(),
            reporterLogin: this.props.reporterLogin,
            reporter: this.props.users.filter((user) => {
                return user.login === this.props.reporterLogin
            })[0]
        }
    }

    render(): React.ReactNode {
        // @ts-ignore
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Dialog
                    open={true}
                    onClose={(e) => this.props.close(false)}
                    maxWidth={false}
                    PaperComponent={PaperComponent}
                    aria-labelledby='draggable-dialog-title'
                >
                    <ResizableBox
                        width={800}
                        className={classes.resizable}
                    >
                        <DialogTitle style={{cursor: 'move'}} id='draggable-dialog-title'>
                            Создание задачи.
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container direction='column' justify='center' alignItems='center'>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Тип задачи:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: '30px'}}>
                                            <Select
                                                value={this.state.taskType}
                                                onChange={(event, child) => {
                                                    this.setState({taskType: event.target.value});
                                                }}
                                                variant={'outlined'}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.state.taskTypes?.map((type) => {
                                                    return <MenuItem value={type}> {type} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Название задачи:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: '30px'}}>
                                            <TextField
                                                id='name'
                                                error={this.state.title === ''}
                                                defaultValue={this.state.title}
                                                onChange={(e) => {
                                                    this.setState({title: e.target.value})
                                                }}
                                                type='login'
                                                variant={'outlined'}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='column' justify='flex-start' alignItems='flex-start'
                                          style={{margin: 4}}>
                                        <Grid item>
                                            <b>Описание проекта:</b>
                                        </Grid>
                                        <Grid item style={{width: '95%', marginTop: 6}}>
                                            <TextField
                                                id='outlined-multiline-description'
                                                multiline
                                                rows={4}
                                                fullWidth
                                                error={this.state.description === ''}
                                                defaultValue={this.state.description}
                                                onChange={(e) => {
                                                    this.setState({description: e.target.value})
                                                }}
                                                variant='outlined'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='column' justify='flex-start' alignItems='flex-start'
                                          style={{margin: 4}}>
                                        <Grid item>
                                            <b>Требования:</b>
                                        </Grid>
                                        <Grid item style={{width: '95%', marginTop: 6}}>
                                            <Autocomplete
                                                multiple
                                                disabled
                                                options={[]}
                                                getOptionLabel={(option) => option}
                                                defaultValue={['требование 1', 'требование 2']}
                                                onChange={(e) => {
                                                    console.log(e)
                                                }}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant='standard'
                                                        placeholder='Начните вводить требование'
                                                        margin='normal'
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Автор*:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: '30px'}}>
                                            <Select
                                                value={this.state.reporterLogin}
                                                disabled
                                                onChange={(event, child) => {
                                                    let id = child.props.id as number;
                                                    let reporter: User = this.props.users.filter(user => {
                                                        return user.id === id
                                                    }).map(user => {
                                                        return user
                                                    })[0];
                                                    this.setState({
                                                        reporter: reporter,
                                                        reporterLogin: event.target.value
                                                    });
                                                }}
                                                variant={'outlined'}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.login}
                                                                     id={user.id}> {user.login} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Исполнитель:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: '30px'}}>
                                            <Select
                                                value={this.state.assigneeLogin}
                                                onChange={(event, child) => {
                                                    let id = child.props.id as number;
                                                    let assignee: User = this.props.users.filter(user => {
                                                        return user.id === id
                                                    }).map(user => {
                                                        return user
                                                    })[0];
                                                    this.setState({
                                                        assignee: assignee,
                                                        assigneeLogin: event.target.value
                                                    });
                                                }}
                                                variant={'outlined'}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.login}
                                                                     id={user.id}> {user.login} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    if (this.state.title === '' || this.state.title === undefined) {
                                        this.props.displayError("Поле 'Название задачи' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.description === '' || this.state.description === undefined) {
                                        this.props.displayError("Поле 'Описание' не может быть пустым.");
                                        return;
                                    }
                                    let taskRequest: TaskRequest = {
                                        title: this.state.title,
                                        status: TaskStatus.CREATED,
                                        type: this.state.taskType || TaskType.TASK,
                                        description: this.state.description,
                                        assigneeId:  this.state.assignee.id === -1? undefined : this.state.assignee.id,
                                        reporterId: this.state.reporter.id
                                    }
                                    this.props.onClose('Ok', taskRequest);
                                    this.props.close(false);
                                }}
                                color='primary'
                                variant={'contained'}
                            >
                                Создать
                            </Button>
                            <Button onClick={(e) => {
                                this.props.onClose('Cancel');
                                this.props.close(false)
                            }}
                                    color='primary'>
                                Отменить
                            </Button>

                        </DialogActions>
                    </ResizableBox>
                </Dialog>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(CreateTaskDialog);
