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
import {BusinessRole, Project, UserProject} from "../../store/project/Types";
import {mapRole, User} from "../../store/users/Types";
import {UserService} from "../../services/UserService";
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from "@material-ui/icons/Close";

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

export interface EditProjectDialogProps {
    users: User[],
    participants?: UserProject[],
    currentProject?: Project,

    displayError(errorMessage: string): any,

    updateProjectStatus(id: number, status: boolean, okCallback?, errorCallback?): any,

    addParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    deleteParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    setParticipantRole(id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?): any,

    getParticipants(id: number, okCallback?, errorCallback?): any,

    onClose(value: string, description?: string, assignee?: User): any,

    close(value: boolean): any
}

export interface EditProjectDialogState {
    businessRoles: BusinessRole[],
    id: number,
    name: string,
    description: string,
    assigneeLogin: string,
    assignee: User,
    active: boolean,
    reporter: User,
    currentProject?: Project,
    newParticipant?: number
}

class EditProjectDialog extends React.Component<EditProjectDialogProps, EditProjectDialogState> {
    constructor(props) {
        super(props);
        let businessRoles: Array<BusinessRole> = new Array<BusinessRole>();
        for (let role in BusinessRole)
            businessRoles.push(role as BusinessRole);
        this.state = {
            businessRoles: businessRoles,
            id: this.props.currentProject ? this.props.currentProject.id : -1,
            name: this.props.currentProject ? this.props.currentProject.name : "",
            description: this.props.currentProject ? this.props.currentProject.description : "",
            assigneeLogin: this.props.currentProject ? this.props.currentProject.assignee.login : "",
            active: this.props.currentProject ? this.props.currentProject.active : false,
            assignee: this.props.currentProject ? this.props.currentProject.assignee : UserService.getEmptyUser(),
            reporter: this.props.currentProject ? this.props.currentProject.reporter : UserService.getEmptyUser()
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentProject !== state.currentProject) {
            return {
                id: props.currentProject ? props.currentProject.id : -1,
                name: props.currentProject ? props.currentProject.name : "",
                description: props.currentProject ? props.currentProject.description : "",
                assigneeLogin: props.currentProject ? props.currentProject.assignee.login : "",
                active: props.currentProject ? props.currentProject.active : false,
                assignee: props.currentProject ? props.currentProject.assignee : UserService.getEmptyUser(),
                reporter: props.currentProject ? props.currentProject.reporter : UserService.getEmptyUser(),
                currentProject: props.currentProject
            };
        }
    }

    render(): React.ReactNode {
        console.log(this.state)
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
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item>
                                    Редактирование проекта.
                                </Grid>
                                <Grid item>
                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        onClick={event => {
                                            this.props.updateProjectStatus(this.state.id, !this.state.active);
                                        }}
                                    >
                                        {this.state.active ? "В архив" : "В работу"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Название проекта:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <TextField
                                                id="name"
                                                error={this.state.name === ""}
                                                defaultValue={this.state.name}
                                                disabled
                                                type="login"
                                                variant={"outlined"}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                                          style={{margin: 4}}>
                                        <Grid item>
                                            <b>Описание проекта:</b>
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
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Руководитель:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.reporter.login}
                                                disabled
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.login}> {user.login} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Управляющий:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
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
                                            <b>Участники проекта:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.newParticipant}
                                                onChange={(event) => {
                                                    this.setState({
                                                        newParticipant: event.target.value
                                                    });
                                                }}
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.id}> {user.login} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={1} style={{marginLeft: 6}}>
                                            <IconButton
                                                size={"small"}
                                                onClick={(e) => {
                                                    if (this.state.newParticipant == null) {
                                                        this.props.displayError("Выберите участника из списка.");
                                                        return;
                                                    }
                                                    this.props.addParticipant(this.state.id, this.state.newParticipant, () => {
                                                        this.props.getParticipants(this.state.id);
                                                    });
                                                }}
                                            >
                                                <AddBoxIcon color={"primary"}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <div style={{margin: 4}}>
                                    <b> Список проектов, в которых пользователь участвует: </b>
                                </div>
                            </DialogContentText>
                            <Paper style={{overflow: "auto"}}>
                                <Table style={{textDecoration: "none"}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Пользователь</TableCell>
                                            <TableCell size={"small"}>Роль</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{textDecoration: "none"}}>
                                        {this.props.participants?.map((user) => {
                                            return <TableRow>
                                                <TableCell>{user.user.login}</TableCell>
                                                <TableCell size={"small"}>
                                                    <Select
                                                        value={user.businessRole}
                                                        onChange={event => {
                                                            this.props.setParticipantRole(this.state.id, user.user.id,
                                                                event.target.value as BusinessRole, () => {
                                                                this.props.getParticipants(this.state.id);
                                                            });
                                                        }}
                                                        variant={"outlined"}
                                                        fullWidth
                                                        displayEmpty
                                                    >
                                                        {this.state.businessRoles.map((role) => {
                                                            return <MenuItem value={role}> {mapRole[role]} </MenuItem>
                                                        })}
                                                    </Select>
                                                </TableCell>
                                                <TableCell size="small">
                                                    <IconButton
                                                        style={{marginTop: 0}}
                                                        onClick={() => {
                                                            this.props.deleteParticipant(this.state.id, user.user.id, () => {
                                                                this.props.getParticipants(this.state.id);
                                                            })
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
                                    if (this.state.assigneeLogin === "" || this.state.assignee === undefined) {
                                        this.props.displayError("Выбор управляющего обязателен.");
                                        return;
                                    }
                                    this.props.onClose('Ok', this.state.description, this.state.assignee);
                                    this.props.close(false);
                                }}
                                color="primary"
                                variant={"contained"}
                            >
                                Создать
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

export default withStyles(styles)(EditProjectDialog);