import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

const styles = theme => createStyles({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    viewForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export interface AuthFormDispatchProps {
    onSignInClicked(username: string, password: string)
}

type AuthFormDispatchPropsWithStyles = AuthFormDispatchProps & WithStyles<typeof styles>

interface AuthFormState {
    username: string,
    password: string
}

class AuthForm extends React.Component<AuthFormDispatchPropsWithStyles, AuthFormState> {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSignIn = (username, password) => {
        this.props.onSignInClicked(username, password);
    }

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <div className={classes.viewForm}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <form
                            style={{width: '100%', marginTop: 10}}
                            onSubmit={(e) => {
                                e.preventDefault()
                                this.handleSignIn(this.state.username, this.state.password);
                            }}>
                            <FormControl margin='normal' required fullWidth>
                                <InputLabel htmlFor='username'>Имя пользователя</InputLabel>
                                <Input id='username'
                                       name='username'
                                       autoComplete='username'
                                       defaultValue={this.state.username}
                                       onChange={(event) =>
                                           this.setState({
                                               username: event.target.value
                                           })
                                       }
                                       autoFocus
                                />
                            </FormControl>
                            <FormControl margin='normal' required fullWidth>
                                <InputLabel htmlFor='password'>Пароль</InputLabel>
                                <Input name='password'
                                       type='password'
                                       id='password'
                                       defaultValue={this.state.password}
                                       onChange={(event) =>
                                           this.setState({
                                               password: event.target.value
                                           })
                                       }
                                       autoComplete='current-password'
                                />
                            </FormControl>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                style={{
                                    marginTop: 12
                                }}
                            >
                                Войти
                            </Button>
                        </form>
                    </div>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(AuthForm)
