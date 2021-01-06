import * as React from "react";
import {Task} from "../../store/tasks/Types";
import {
    Button,
    Chip,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";


export interface TaskViewProps {
    task: Task
}

export interface TaskViewState {
    requirements: any[]
}

export default class TaskView extends React.Component<TaskViewProps, TaskViewState> {
    constructor(props) {
        super(props);
        this.state = {
            requirements: [
                {
                    title: 'req1',
                    description: 'Описание требования 1'
                },
                {
                    title: 'req2',
                    description: 'Описание требования 2'
                }]
        }
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={1} style={{margin: 10, marginLeft: 20}}>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                          style={{margin: 6, padding: 6}}>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                              style={{width: "50%"}}>
                            <Grid item style={{margin: 10}}>
                                <Typography variant="button" color={"primary"}>
                                    <b>{this.props.task.title}</b>
                                </Typography>
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Тип задачи: </b>{this.props.task.type}
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Статус: </b> <Chip label={this.props.task.status} color={"primary"}/>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                              style={{width: "50%"}}>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                                  style={{margin: 6, padding: 6}}>
                                <Button
                                    onClick={(e) => {
                                        console.log("edit")
                                        //this.setState({editRelease: true})
                                    }}
                                    color="primary"
                                    variant={"contained"}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        console.log("delete")
                                        //this.setState({confirmDelete: true})
                                    }}
                                    color="primary">
                                    Удалить
                                </Button>
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Исполнитель: </b>{this.props.task.assignee ? this.props.task.assignee.login : "не назначен"}
                            </Grid>
                            <Grid item style={{margin: 6}}>
                                <b>Автор: </b>{this.props.task.reporter.login}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                          style={{margin: 6, padding: 6}}>
                        <Grid item style={{margin: 6, marginTop: 10}}>
                            <b>Описание задачи: </b>
                        </Grid>
                        <Grid item xs={10} style={{margin: 6, width: "100%"}}>
                            {this.props.task.description}
                        </Grid>
                        <Grid item style={{margin: 6, marginTop: 10}}>
                            <b>Список требований: </b>
                        </Grid>
                        <Grid item xs={10} style={{margin: 6, width: "100%"}}>
                            <Table style={{textDecoration: "none"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Требование </TableCell>
                                        <TableCell>Описание</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{textDecoration: "none"}}>
                                    {this.state.requirements?.map((req) => {
                                        return <TableRow>
                                            <TableCell>{req.title}</TableCell>
                                            <TableCell>{req.description}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }

}
