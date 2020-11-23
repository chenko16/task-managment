import * as React from "react";
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
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import {mapRole, SystemRole, User} from "../../store/users/Types";
import {Project, ProjectsByUsers} from "../../store/project/Types";
import {Autocomplete} from "@material-ui/lab";


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

export interface UserEditFormProps {
    currentUser?: User,
    //  projects: Project[],
    //userProjects: ProjectsByUsers[],

    // displayError(msg: string): any,

    onClose(value: string, data?: any): any,

    close(value: boolean): any
}

export interface UserEditFormState {
    user: User,
    systemRoles: SystemRole[],
}

class UserEditForm extends React.Component<UserEditFormProps, UserEditFormState> {
    constructor(props) {
        super(props);
        let systemRoles: Array<SystemRole> = new Array<SystemRole>();
        for (let role in SystemRole)
            systemRoles.push(role as SystemRole);
        this.state = {
            user: this.props.currentUser ? this.props.currentUser : {
                id: -1,
                login: "",
                systemRole: SystemRole.USER,
                active: false
            },
            systemRoles: systemRoles
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentUser !== state.user) {
            return {
                user: props.currentNode
            };
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Dialog
                    open={true}
                    onClose={this.props.onClose("Cancel")}
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
                                    <Button color={"primary"} variant={"contained"}>
                                        {this.state.user.active ? "Деактивировать" : "Активировать"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Логин:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <TextField
                                                id="name"
                                                disabled
                                                defaultValue={this.state.user.login}
                                                type="login"
                                                variant={"outlined"}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{margin: 4}}>
                                        <Grid item xs={2}>
                                            <b>Роль в системе:</b>
                                        </Grid>
                                        <Grid item xs={8} style={{marginLeft: "30px"}}>
                                            <Select
                                                value={this.state.user.systemRole}
                                                variant={"outlined"}
                                                fullWidth
                                                displayEmpty
                                            >
                                                {this.state.systemRoles.map((role) => {
                                                    return  <MenuItem value={role}> {mapRole[role]} </MenuItem>
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <div style={{margin: 4}}>
                                    <b> Список проектов, в которых пользователь участвует: </b>
                                </div>
                                {/*Укажите название поля, в которое будет записываться время записи, а также выберите*/}
                                {/*формат времени и*/}
                                {/*временную зону, в которой Вы хотите хранить время.*/}
                            </DialogContentText>

                            {/*<Autocomplete*/}
                            {/*    options={this.props.timeFormats}*/}
                            {/*    renderOption={(option) => {*/}
                            {/*        return option;*/}
                            {/*    }}*/}
                            {/*    getOptionLabel={option => {*/}
                            {/*        return option;*/}
                            {/*    }}*/}
                            {/*    defaultValue={this.state.timeFormat}*/}
                            {/*    onChange={(event, newValue) => {*/}
                            {/*        this.setState({timeFormat: newValue})*/}
                            {/*    }}*/}
                            {/*    renderInput={params => (*/}
                            {/*        <TextField*/}
                            {/*            {...params}*/}
                            {/*            variant="standard"*/}
                            {/*            error={this.state.timeFormat === ""}*/}
                            {/*            label="Формат времени"*/}
                            {/*            placeholder="Выберите формат времени"*/}
                            {/*            margin="normal"*/}
                            {/*            fullWidth*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*/>*/}
                            {/*<Autocomplete*/}
                            {/*    options={this.props.timezones}*/}
                            {/*    renderOption={(option) => {*/}
                            {/*        return option;*/}
                            {/*    }}*/}
                            {/*    getOptionLabel={option => {*/}
                            {/*        return option;*/}
                            {/*    }}*/}
                            {/*    defaultValue={this.state.timezone}*/}
                            {/*    onChange={(event, newValue) => {*/}
                            {/*        this.setState({timezone: newValue})*/}
                            {/*    }}*/}
                            {/*    renderInput={params => (*/}
                            {/*        <TextField*/}
                            {/*            {...params}*/}
                            {/*            variant="standard"*/}
                            {/*            error={this.state.timezone === ""}*/}
                            {/*            label="Временная зона"*/}
                            {/*            placeholder="Выберите временную зону"*/}
                            {/*            margin="normal"*/}
                            {/*            fullWidth*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*/>*/}
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    // if (this.state.toField == "" || this.state.toField == null) {
                                    //     this.props.displayError("Нужно ввести название поля!")
                                    //     return;
                                    // }
                                    // if (this.state.timeFormat == "" || this.state.timeFormat == null) {
                                    //     this.props.displayError("Нужно указать формат времени!")
                                    //     return;
                                    // }
                                    // if (this.state.timezone == "" || this.state.timezone == null) {
                                    //     this.props.displayError("Нужно указать временную зону!")
                                    //     return;
                                    // }
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