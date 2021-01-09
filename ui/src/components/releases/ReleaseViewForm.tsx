import * as React from 'react';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography
} from '@material-ui/core';
import {Release} from '../../store/releases/Types';
import parseISO from 'date-fns/parseISO';
import {Task} from '../../store/tasks/Types';
import ConfirmDialog from '../ConfirmDialog';
import {Project} from '../../store/project/Types';
import EditReleaseDialog from './EditReleaseDialog';
import {User} from '../../store/users/Types';

export interface ReleaseViewFormProps {
    release: Release,

    updateDescription (id: number, description: string, okCallback?, errorCallback?): any,
    finishRelease (id: number, okCallback?, errorCallback?): any,
    deleteRelease (id: number, okCallback?, errorCallback?): any,
    displayError(msg: string): any,
    addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,
    deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?): any,

    tasks: Task[],
    projects: Project[],
    users: User[]
}

export interface ReleaseViewFormState {
    confirmFinish: boolean,
    confirmDelete: boolean,
    editRelease: boolean
}

export class ReleaseViewForm extends React.Component<ReleaseViewFormProps, ReleaseViewFormState> {
    constructor(props) {
        super(props);
        this.state = {
            confirmDelete: false,
            confirmFinish: false,
            editRelease: false
        }
        this.handleConfirmDialogDeleteClose = this.handleConfirmDialogDeleteClose.bind(this);
        this.handleConfirmDialogFinishClose = this.handleConfirmDialogFinishClose.bind(this);
    }

    handleConfirmDialogDeleteClose(value) {
        this.setState({confirmDelete: false});
        if (value === 'Ok') {
            this.props.deleteRelease(this.props.release.id);
        }
    }

    handleConfirmDialogFinishClose(value) {
        this.setState({confirmFinish: false});
        if (value === 'Ok') {
            this.props.finishRelease(this.props.release.id);
        }
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                {this.state.editRelease && <EditReleaseDialog
                    addTaskToRelease={this.props.addTaskToRelease}
                    deleteTaskFromRelease={this.props.deleteTaskFromRelease}
                    tasks={this.props.tasks}
                    users={this.props.users}
                    projects={this.props.projects}
                    displayError={this.props.displayError}
                    release={this.props.release}
                    reporterLogin={this.props.release.reporter.login}
                    onClose={(value, description) => {
                        if (value === 'Ok' && description) {
                            this.props.updateDescription(this.props.release.id, description)
                        }
                    }}
                    close={value => {this.setState({editRelease: value})}}
                />}

                <Paper elevation={1} style={{margin: 10, marginLeft: 20}}>
                    <Grid container direction='row' justify='flex-start' alignItems='flex-start'
                          style={{margin: 6, padding: 6}}>
                        <Grid container direction='column' justify='flex-start' alignItems='flex-start'
                              style={{width: '50%'}}>
                            <Grid item style={{margin: 10}}>
                                <Typography variant='button' color={'primary'}>
                                    <b>{this.props.release.name}</b>
                                </Typography>
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Проект: </b>{this.props.release.project.name}
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Автор: </b>{this.props.release.reporter.login}
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justify='flex-start' alignItems='flex-start'
                              style={{width: '50%'}}>
                            <Grid container direction='row' justify='flex-start' alignItems='flex-start'
                                  style={{margin: 6, padding: 6}}>
                                <Button
                                    onClick={(e) => {
                                       this.setState({editRelease: true})
                                    }}
                                    color='primary'
                                    variant={'contained'}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        this.setState({confirmFinish: true})
                                    }}
                                    disabled={this.props.release.finished!==null}
                                    variant={'contained'}
                                    style={{marginLeft: 4, marginRight: 4}}
                                    color='primary'>
                                    Закрыть
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        this.setState({confirmDelete: true})
                                    }}
                                    color='primary'>
                                    Удалить
                                </Button>
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Дата создания: </b>{parseISO(this.props.release.created).toLocaleDateString('en-US')}
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Дата окончания: </b>{this.props.release.finished ?
                                parseISO(this.props.release.finished).toLocaleDateString('en-US') : 'релиз еще в работе'}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction='column' justify='flex-start' alignItems='flex-start'
                          style={{margin: 6, padding: 6}}>
                        <Grid item style={{margin: 6, marginTop: 10}}>
                            <b>Описание релиза: </b>
                        </Grid>
                        <Grid item xs={10} style={{margin: 6, width: '100%'}}>
                            {this.props.release.description}
                        </Grid>
                        <Grid item style={{margin: 6, marginTop: 10}}>
                            <b>Список задач релиза: </b>
                        </Grid>
                        <Grid item xs={10} style={{margin: 6, width: '100%'}}>
                            <Table style={{textDecoration: 'none'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Задача </TableCell>
                                        <TableCell>Описание</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{textDecoration: 'none'}}>
                                    {this.props.tasks?.filter((task) => {
                                        return this.props.release.tasks.some((taskRelease) => taskRelease === task.id)
                                    }).map((task: Task) => {
                                        return <TableRow>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>

                <ConfirmDialog
                    warningText={'Вы уверены, что хотите удалить релиз?'}
                    open={this.state.confirmDelete}
                    okString={'Да'}
                    cancelString={'Отмена'}
                    onClose={this.handleConfirmDialogDeleteClose}
                />

                <ConfirmDialog
                    warningText={'Подтвердите завершение релиза.'}
                    open={this.state.confirmFinish}
                    okString={'Подтвердить'}
                    cancelString={'Отмена'}
                    onClose={this.handleConfirmDialogFinishClose}
                />
            </React.Fragment>
        )
    }

}
