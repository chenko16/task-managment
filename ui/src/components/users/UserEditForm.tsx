import * as React from "react";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    withStyles
} from "@material-ui/core";
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import {mapRole, SystemRole, User} from "../../store/users/Types";
import {Project, ProjectsByUsers} from "../../store/project/Types";

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

interface ProjectRole {
    projectName: string,
    role: string
}

export interface UserEditFormProps {
    currentUser?: User,
    projects: Project[],
    userProjects: ProjectsByUsers | undefined,

    onClose(value: string, data?: any): any,

    updateUserStatus(id: number, status: boolean): any,

    fetchProjectsByUser(userId: number): any

    close(value: boolean): any
}

export interface UserEditFormState {
    id: number,
    login: string,
    systemRole: SystemRole,
    active: boolean,
    user?: User,
    systemRoles: SystemRole[]
}

class UserEditForm extends React.Component<UserEditFormProps, UserEditFormState> {
    constructor(props) {
        super(props);
        let systemRoles: Array<SystemRole> = new Array<SystemRole>();
        for (let role in SystemRole)
            systemRoles.push(role as SystemRole);
        this.state = {
            id: this.props.currentUser ? this.props.currentUser.id : -1,
            login: this.props.currentUser ? this.props.currentUser.login : "",
            systemRole: this.props.currentUser ? this.props.currentUser.systemRole : SystemRole.USER,
            active: this.props.currentUser ? this.props.currentUser.active : false,
            systemRoles: systemRoles
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.currentUser !== state.user) {
    //         return {
    //             id: props.currentUser ? props.currentUser.id : -1,
    //             login: props.currentUser ? props.currentUser.login : "",
    //             systemRole: props.currentUser ? props.currentUser.systemRole : SystemRole.USER,
    //             active: props.currentUser ? props.currentUser.active : false,
    //             user: props.currentNode
    //         };
    //     }
    // }

    componentDidMount(): void {
        this.props.fetchProjectsByUser(this.props.currentUser?.id);
    }

    createRolesTable(projects: Project[], userProjects: ProjectsByUsers | undefined) : ProjectRole[] {
        let projectRoles: ProjectRole[] = [];

        userProjects?.assignee?.forEach((projectId) => {
            let projectRole: ProjectRole = {
                projectName: projects.filter((project) => {
                    return project.id === projectId
                })[0].name,
                role: "ASSIGNEE"
            }
            projectRoles.push(projectRole);
        });

        userProjects?.reporters?.forEach((projectId) => {
            let projectRole: ProjectRole = {
                projectName: projects.filter((project) => {
                    return project.id === projectId
                })[0].name,
                role: "REPORTER"
            }
            projectRoles.push(projectRole);
        });

        userProjects?.participants?.forEach((roleInProject) => {
            let projectRole: ProjectRole = {
                projectName: projects.filter((project) => {
                    return project.id === roleInProject.projectId
                })[0].name,
                role: roleInProject.role
            }
            projectRoles.push(projectRole);
        });

        return projectRoles;
    }

    render() {
        console.log(JSON.stringify(this.state,null,2))
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
                                    Настройки пользователя.
                                </Grid>
                                <Grid item>
                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        onClick={event => {
                                            this.props.updateUserStatus(this.state.id,!this.state.active);
                                        }}
                                    >
                                        {this.state.active ? "Деактивировать" : "Активировать"}
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
                                            <b>Логин:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <TextField
                                                id="name"
                                                disabled
                                                defaultValue={this.state.login}
                                                type="login"
                                                variant={"outlined"}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Роль в системе:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.systemRole}
                                                onChange={event => {
                                                    this.setState({systemRole: (event.target.value as SystemRole)});
                                                }}
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.state.systemRoles.map((role) => {
                                                    return <MenuItem value={role}> {mapRole[role]} </MenuItem>
                                                })}
                                            </Select>
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
                                            <TableCell>Проект</TableCell>
                                            <TableCell>Роль</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{textDecoration: "none"}}>
                                        {this.createRolesTable(this.props.projects, this.props.userProjects).map((projectRole) => {
                                            return <TableRow>
                                                <TableCell>{projectRole.projectName}</TableCell>
                                                <TableCell>{mapRole[projectRole.role]}</TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
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


export default withStyles(styles)(UserEditForm);