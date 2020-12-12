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
    Paper, Select, TextField,
    withStyles
} from "@material-ui/core";
import {User} from "../../store/users/Types";
import {Project} from "../../store/project/Types";
import {ReleaseRequest} from "../../store/releases/Types";

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

export interface AddReleaseDialogProps {
    projects: Project[],
    users: User[],
    reporterLogin: string,

    displayError(errorMessage: string): any,

    onClose(value: string, releaseRequest?: ReleaseRequest): any,

    close(value: boolean): any
}

export interface AddReleaseDialogState {
    name: string,
    description: string,
    projectId: number,
    reporterLogin: string,
    reporter: User
}

class AddReleaseDialog extends React.Component<AddReleaseDialogProps, AddReleaseDialogState> {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            projectId: -1,
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
                                                    return <MenuItem value={user.login} id={user.id}> {user.login} </MenuItem>
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
                                                value={this.state.projectId}
                                                onChange={(event, child)=> {
                                                    this.setState({projectId: event.target.value});
                                                }}
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
                                                error={this.state.description===""}
                                                defaultValue={this.state.description}
                                                onChange={(e) => {
                                                    this.setState({description: e.target.value})
                                                }}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    if (this.state.name === "" || this.state.name === undefined) {
                                        this.props.displayError("Поле 'Название релиза' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.description === "" || this.state.description === undefined) {
                                        this.props.displayError("Поле 'Описание' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.projectId === -1 || this.state.projectId === undefined) {
                                        this.props.displayError("Поле 'Проект' не может быть пустым.");
                                        return;
                                    }
                                    if (this.state.reporterLogin === "" || this.state.reporter === undefined) {
                                        this.props.displayError("Выбор руководителя обязателен.");
                                        return;
                                    }
                                    let releaseRequest: ReleaseRequest = {
                                        name: this.state.name,
                                        projectId: this.state.projectId,
                                        description: this.state.description,
                                        reporterId: this.state.reporter.id
                                    };
                                    this.props.onClose('Ok', releaseRequest);
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

export default withStyles(styles)(AddReleaseDialog);