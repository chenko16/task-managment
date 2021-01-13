import * as React from 'react';
import Draggable from 'react-draggable';
import {ResizableBox} from 'react-resizable';
import {
    Button, createStyles,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem,
    Paper, Select, TextField, withStyles
} from '@material-ui/core';
import {mapRole, SystemRole, UserRequest} from '../../store/users/Types';


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


export interface AddUserDialogProps {
    displayError(errorMessage: string): any,

    onClose(value: string, data?: any): any,

    close(value: boolean): any
}

export interface AddUserDialogState {
    login: string,
    password: string,
    password1: string,
    systemRole: SystemRole,
    systemRoles: SystemRole[]
}

class AddUserDialog extends React.Component<AddUserDialogProps, AddUserDialogState> {
    constructor(props) {
        super(props);
        let systemRoles: Array<SystemRole> = new Array<SystemRole>();
        for (let role in SystemRole)
            systemRoles.push(role as SystemRole);
        this.state = {
            login: '',
            password: '',
            password1: '',
            systemRole: SystemRole.USER,
            systemRoles: systemRoles
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
                        width={700}
                        className={classes.resizable}
                    >
                        <DialogTitle style={{cursor: 'move', textAlign: 'center'}} id='draggable-dialog-title'>
                            Создание пользователя.
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container direction='column' justify='center' alignItems='center'>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item style={{width: '100%'}}>
                                            <TextField
                                                id='name'
                                                label={'Логин пользователя'}
                                                error={this.state.login === ''}
                                                defaultValue={this.state.login}
                                                onChange={(event => {
                                                    this.setState({login: event.target.value})
                                                })}
                                                type='login'
                                                variant={'outlined'}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item style={{width: 'calc((100% - 6px)/2)'}}>
                                        <form autoComplete="off">
                                            <TextField
                                                id='password'
                                                label={'Пароль'}
                                                error={this.state.password === ''}
                                                defaultValue={this.state.password}
                                                onChange={(event => {
                                                    this.setState({password: event.target.value})
                                                })}
                                                type='password'
                                                variant={'outlined'}
                                                fullWidth
                                            />
                                        </form>
                                        </Grid>
                                        <Grid item style={{marginLeft: '6px', width: 'calc((100% - 6px)/2)'}}>
                                        <form autoComplete="off">
                                            <TextField
                                                label={'Повторите пароль'}
                                                id='password1'
                                                error={(this.state.password1 === '') || (this.state.password1 !== this.state.password)}
                                                defaultValue={this.state.password1}
                                                onChange={(event => {
                                                    this.setState({password1: event.target.value})
                                                })}
                                                type='password'
                                                variant={'outlined'}
                                                fullWidth
                                            />
                                        </form>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' justify='flex-start' alignItems='center'
                                          style={{margin: 4}}>
                                        <Grid item style={{width: '30%'}}>
                                            <b>Роль в системе:</b>
                                        </Grid>
                                        <Grid item style={{marginLeft: '10px', width: 'calc(70% - 10px)'}}>
                                            <Select
                                                value={this.state.systemRole}
                                                onChange={event => {
                                                    this.setState({systemRole: (event.target.value as SystemRole)});
                                                }}
                                                variant={'outlined'}
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

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{marginTop: 6, marginRight: 6}}>
                            <Button
                                onClick={(e) => {
                                    if (this.state.password !== this.state.password1) {
                                        this.props.displayError('Пароли не совпадают.');
                                        return;
                                    }
                                    if (this.state.login === '' || this.state.login === undefined) {
                                        this.props.displayError('Поле логин не может быть пустым.');
                                        return;
                                    }
                                    if (this.state.password1 === '' || this.state.password1 === undefined ||
                                         this.state.password === '' || this.state.password === undefined) {
                                        this.props.displayError('Поле пароль не может быть пустым.');
                                        return;
                                    }
                                    let userRequest: UserRequest = {
                                        login: this.state.login,
                                        password: this.state.password,
                                        systemRole: this.state.systemRole
                                    }
                                    this.props.onClose('Ok', userRequest)
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


export default withStyles(styles)(AddUserDialog);
