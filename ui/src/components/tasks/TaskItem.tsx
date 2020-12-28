import * as React from "react";
import {Avatar, Button, Card, CardActions, CardContent, Grid, IconButton, Typography} from "@material-ui/core";
import Utils from "../../store/users/Utils";
import {Task} from "../../store/tasks/Types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export interface TaskItemProps {
    task: Task
}

export interface TaskItemState {

}

export default class TaskItem extends React.Component<TaskItemProps, TaskItemState> {
    constructor(props) {
        super(props);
    }

    getAvatar(name: string) {
        return (<Avatar
            src={"https://ui-avatars.com/api/?size=96&name=" + name
            + "&font-size=0.33&background=" + Utils.getUserColor(name) + "&color=000&rounded=true"}
            style={{borderRadius: 0, height: 48, width: 48, marginRight: 2}}/>)
    }

    getDescriptionShort(description: string) {
        let val = description;
        if (val.length > 10) {
            val = val.substr(0, 10) + "\n..."
        }
        return val;
    }

    render(): React.ReactNode {
        return (
            <Card elevation={1}>
                <CardContent>
                    <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
                        {this.props.task.assignee ? this.getAvatar(this.props.task.assignee.login) : this.getAvatar(this.props.task.reporter.login)}
                        <Grid item sm>
                            <Typography variant="h6" color="primary">
                                {this.props.task.title}
                            </Typography>
                            <Typography>
                                <b>Тип</b>: {this.props.task.type}
                            </Typography>
                            <Typography>
                                <b>Описание задачи</b>:
                                <div>{this.getDescriptionShort(this.props.task.description)}</div>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <IconButton
                        size="small"
                        onClick={e => {
                            console.log("подробнее")
                        }}
                    >
                        <ExpandMoreIcon color="primary"/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}
