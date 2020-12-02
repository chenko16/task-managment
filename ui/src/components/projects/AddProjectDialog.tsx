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
import {BusinessRole} from "../../store/project/Types";
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

    displayError(errorMessage: string): any,

    onClose(value: string, data?: any): any,

    close(value: boolean): any
}

export interface AddProjectDialogState {
    businessRoles: BusinessRole[],
    name: string,
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
            assigneeLogin: "",
            assignee: UserService.getEmptyUser(),
            reporterLogin: "",
            reporter: UserService.getEmptyUser()
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
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Руководитель:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.reportLogin}
                                                onChange={(event, child)=> {
                                                    let id = child.props.id as number;
                                                    console.log(id)
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
                                                    console.log(id)
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
                                <div style={{margin: 4}}>
                                    <b> Список проектов, в которых пользователь участвует: </b>
                                </div>
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
                                    this.props.onClose('Ok', this.state)
                                    this.props.close(false);
                                }}
                                color="primary"
                                variant={"contained"}
                            >
                                Обновить
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