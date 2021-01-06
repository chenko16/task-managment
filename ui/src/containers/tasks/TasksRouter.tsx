import * as React from "react";
import {Route} from "react-router-dom"
import TasksOverview from "./TasksOverview";
import TaskInfoView from "./TaskInfoView";

export default class TasksRouter extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{flexGrow: 1, marginTop: 16}}>
                    <Route path="/tasks" exact component={TasksOverview}/>
                    <Route path="/tasks/:taskName&:id" component={TaskInfoView}/>
                </div>
            </React.Fragment>
        )
    }
}

