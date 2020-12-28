import * as React from "react";
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, IconButton, MenuItem,
    Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField,
    withStyles
} from "@material-ui/core";
import {mapRole, User} from "../../store/users/Types";
import {BusinessRole, Project} from "../../store/project/Types";
import {Release} from "../../store/releases/Types";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/Close";
import {Task} from "../../store/tasks/Types";

const styles = theme => createStyles({
    resizable: {
        position: "relative",
        "& .react-resizable-handle": {
            position: "absolute",
            width: 20,
            height: 20,
            bottom: 0,
            right: 0,
            background:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
            "background-position": "bottom right",
            padding: "0 3px 3px 0",
            "background-repeat": "no-repeat",
            "background-origin": "content-box",
            "box-sizing": "border-box",
            cursor: "se-resize"
        }
    }
});

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export interface EditReleaseDialogProps {
    release: Release,
    users: User[],
    tasks: Task[],
    projects: Project[],
    reporterLogin: string,

    displayError(errorMessage: string): any,

    onClose(value: string, description?: string): any,

    addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    close(value: boolean): any
}

export interface EditReleaseDialogState {
    description: string,
    reporterLogin: string,
    reporter: User,
    newTask: number
}

class EditReleaseDialog extends React.Component<EditReleaseDialogProps, EditReleaseDialogState> {
    constructor(props) {
        super(props);
        this.state = {
            newTask: -1,
            description: this.props.release.description,
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
                    aria-labelledby="draggable-dialog-title"
                >
                    <ResizableBox
                        width={800}
                        className={classes.resizable}
                    >
                        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                            Создание релиза.
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Имя релиза:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <TextField
                                                id="name"
                                                defaultValue={this.props.release.name}
                                                disabled
                                                type="login"
                                                variant={"outlined"}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Создатель*:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.reporterLogin}
                                                disabled
                                                variant={"outlined"}
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
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Проект*:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.props.release.project.id}
                                                disabled
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.projects?.map((project, ind) => {
                                                    return <MenuItem value={project.id}> {project.name} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                                          style={{margin: 4}}>
                                        <Grid item>
                                            <b>Описание релиза:</b>
                                        </Grid>
                                        <Grid item style={{width: "95%", marginTop: 6}}>
                                            <TextField
                                                id="outlined-multiline-description"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                error={this.state.description === ""}
                                                defaultValue={this.state.description}
                                                onChange={(e) => {
                                                    this.setState({description: e.target.value})
                                                }}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" justify="flex-start" alignItems="center"
                                      style={{margin: 4}}>
                                    <Grid item xs={2}>
                                        <b>Задачи:</b>
                                    </Grid>
                                    <Grid item xs={8} style={{marginLeft: "30px"}}>
                                        <Select
                                            value={this.state.newTask}
                                            onChange={(event) => {
                                                this.setState({
                                                    newTask: event.target.value
                                                });
                                            }}
                                            variant={"outlined"}
                                            fullWidth
                                            displayEmpty
                                        >
                                            {this.props.tasks?.map((task, ind) => {
                                                return <MenuItem value={task.id}> {task.title} </MenuItem>
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={1} style={{marginLeft: 6}}>
                                        <IconButton
                                            size={"small"}
                                            onClick={(e) => {
                                                if (this.state.newTask == null) {
                                                    this.props.displayError("Выберите задачу из списка.");
                                                    return;
                                                }
                                                this.props.addTaskToRelease(this.props.release.id, this.state.newTask);
                                            }}
                                        >
                                            <AddBoxIcon color={"primary"}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <div style={{margin: 4}}>
                                    <b> Список задач релиза: </b>
                                </div>
                            </DialogContentText>
                            <Paper style={{overflow: "auto"}}>
                                <Table style={{textDecoration: "none"}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell size={"small"}>Название</TableCell>
                                            <TableCell>Описание</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{textDecoration: "none"}}>
                                        {this.props.release.tasks?.map((task) => {
                                            return <TableRow>
                                                <TableCell size={"small"}>{task.title}</TableCell>
                                                <TableCell>{task.description}</TableCell>
                                                <TableCell size="small">
                                                    <IconButton
                                                        style={{marginTop: 0}}
                                                        onClick={() => {
                                                            this.props.deleteTaskFromRelease(this.props.release.id, task.id)
                                                        }}
                                                    >
                                                        <CloseIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    if (this.state.description === "" || this.state.description === undefined) {
                                        this.props.displayError("Поле 'Описание' не может быть пустым.");
                                        return;
                                    }
                                    this.props.onClose('Ok', this.state.description);
                                    this.props.close(false);
                                }}
                                color="primary"
                                variant={"contained"}
                            >
                                Редактировать
                            </Button>
                            <Button onClick={(e) => {
                                this.props.onClose('Cancel');
                                this.props.close(false)
                            }}
                                    color="primary">
                                Отменить
                            </Button>
                        </DialogActions>
                    </ResizableBox>
                </Dialog>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(EditReleaseDialog);
