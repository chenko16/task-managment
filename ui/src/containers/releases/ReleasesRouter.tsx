import * as React from "react";
import {Route} from "react-router-dom"
import ReleasesView from "./ReleasesView";
import ReleaseView from "./ReleaseView";

export default class ReleasesRouter extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{flexGrow: 1, marginTop: 16}}>
                    <Route path="/releases" exact component={ReleasesView}/>
                    <Route path="/releases/:releaseName&:id" component={ReleaseView}/>
                </div>
            </React.Fragment>
        )
    }
}

