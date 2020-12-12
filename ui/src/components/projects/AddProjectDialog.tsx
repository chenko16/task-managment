import * as React from "react";
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, MenuItem,
    Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField,
    withStyles
} from "@material-ui/core";
import {mapRole, SystemRole, User, UserRequest} from "../../store/users/Types";
import {BusinessRole, ProjectRequest} from "../../store/project/Types";
import {UserService} from "../../services/UserService";

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

export interface AddProjectDialogProps {
    users: User[],
    reporterLogin: string,

    displayError(errorMessage: string): any,

    onClose(value: string, projectRequest?: ProjectRequest, assignee?: User, reporter?: User, description?: string): any,

    close(value: boolean): any
}

export interface AddProjectDialogState {
    businessRoles: BusinessRole[],
    name: string,
    description: string,
    assigneeLogin: string,
    assignee: User,
    reporterLogin: string,
    reporter: User
}

class AddProjectDialog extends React.Component<AddProjectDialogProps, AddProjectDialogState> {
    constructor(props) {
        super(props);
        let businessRoles: Array<BusinessRole> = new Array<BusinessRole>();
        for (let role in BusinessRole)
            businessRoles.push(role as BusinessRole);
        this.state = {
            businessRoles: businessRoles,
            name: "",
            description: "",
            assigneeLogin: "",
            assignee: UserService.getEmptyUser(),
            reporterLogin: this.props.reporterLogin,
            reporter: this.props.users.filter((user) => {
                return user.login === this.props.reporterLogin
            })[0]
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
                            Создание проекта.
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
                                                error={this.state.name===""}
                                                defaultValue={this.state.name}
                                                onChange={(e) => {
                                                    this.setState({name: e.target.value})
                                                }}
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
                                                error={this.state.description===""}
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
                                                value={this.state.reporterLogin}
                                                disabled
                                                onChange={(event, child)=> {
                                                    let id = child.props.id as number;
                                                    let reporter: User = this.props.users.filter(user => {
                                                        return user.id === id
                                                    }).map(user => {
                                                        return user
                                                    })[0];
                                                    this.setState({reporter: reporter, reporterLogin: event.target.value});
                                                }}
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.login} id={user.id}> {user.login} </MenuItem>
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
                                                onChange={(event, child)=> {
                                                    let id = child.props.id as number;
                                                    let assignee: User = this.props.users.filter(user => {
                                                        return user.id === id
                                                    }).map(user => {
                                                        return user
                                                    })[0];
                                                    this.setState({assignee: assignee, assigneeLogin: event.target.value});
                                                }}
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.props.users?.map((user, ind) => {
                                                    return <MenuItem value={user.login} id={user.id}> {user.login} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/*<Grid container direction="column" justify="flex-start" alignItems="flex-start"*/}
                                {/*      style={{margin: 4}}>*/}
                                {/*    <Grid item>*/}
                                {/*        <b>Участники проекта:</b>*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item style={{width: "95%", marginTop: 6}}>*/}
                                {/*        <TextField*/}
                                {/*            id="outlined-multiline-description"*/}
                                {/*            multiline*/}
                                {/*            rows={4}*/}
                                {/*            fullWidth*/}
                                {/*            defaultValue={this.state.description}*/}
                                {/*            onChange={(e) => {*/}
                                {/*                this.setState({description: e.target.value})*/}
                                {/*            }}*/}
                                {/*            variant="outlined"*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*</Grid>*/}
                                {/*<div style={{margin: 4}}>*/}
                                {/*    <b> Список проектов, в которых пользователь участвует: </b>*/}
                                {/*</div>*/}
                            </DialogContentText>
                            {/*<Paper style={{overflow: "auto"}}>*/}
                            {/*    <Table style={{textDecoration: "none"}}>*/}
                            {/*        <TableHead>*/}
                            {/*            <TableRow>*/}
                            {/*                <TableCell>Проект</TableCell>*/}
                            {/*                <TableCell>Роль</TableCell>*/}
                            {/*            </TableRow>*/}
                            {/*        </TableHead>*/}
                            {/*        <TableBody style={{textDecoration: "none"}}>*/}
                            {/*            {this.createRolesTable(this.props.projects, this.props.userProjects).map((projectRole) => {*/}
                            {/*                return <TableRow>*/}
                            {/*                    <TableCell>{projectRole.projectName}</TableCell>*/}
                            {/*                    <TableCell>{mapRole[projectRole.role]}</TableCell>*/}
                            {/*                </TableRow>*/}
                            {/*            })}*/}
                            {/*        </TableBody>*/}
                            {/*    </Table>*/}
                            {/*</Paper>*/}
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    if (this.state.name === "" || this.state.name === undefined) {
                                        this.props.displayError("Поле 'Название проекта' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.description === "" || this.state.description === undefined) {
                                        this.props.displayError("Поле 'Описание' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.assigneeLogin === "" || this.state.assignee === undefined) {
                                        this.props.displayError("Выбор управляющего обязателен.");
                                        return;
                                    }
                                    if (this.state.reporterLogin === "" || this.state.reporter === undefined) {
                                        this.props.displayError("Выбор руководителя обязателен.");
                                        return;
                                    }
                                    let projectRequest: ProjectRequest = {
                                        name: this.state.name
                                    };
                                    this.props.onClose('Ok', projectRequest, this.state.assignee, this.state.reporter, this.state.description);
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

export default withStyles(styles)(AddProjectDialog);