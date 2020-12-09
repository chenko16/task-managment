import * as React from "react";
import {User} from "../../store/users/Types";
import {Project} from "../../store/project/Types";
import * as userSelectors from "../../store/users/Reducer";
import * as projectSelectors from "../../store/project/Reducer";
import * as userActions from "../../store/users/Actions";
import * as projectActions from "../../store/project/Actions";
import * as notificationActions from "../../store/notification/Actions";
import * as releasesActions from "../../store/releases/Actions";
import * as releasesSelectors from "../../store/releases/Reducer";
import {connect} from "react-redux";
import {Release, ReleaseRequest} from "../../store/releases/Types";
import {ReleasesOverviewForm} from "../../components/releases/ReleasesOverviewForm";


export interface ReleasesViewDispatchProps {
    displayError(msg: string): any,

    fetchUsers(): any,

    fetchProjects(): any,

    fetchReleases(): any,

    createRelease(release: ReleaseRequest, okCallback?, errorCallback?): any
}

export interface ReleasesViewStateProps {
    users: User[],
    projects: Project[],
    releases: Release[],

    isLoading: boolean
}

export interface ReleasesViewProps {

}

export interface ReleasesViewState {

}

class ReleasesView extends React.Component<ReleasesViewProps & ReleasesViewDispatchProps & ReleasesViewStateProps, ReleasesViewState> {
    constructor(props) {
        super(props);
        this.props.fetchReleases();
        this.props.fetchProjects();
        this.props.fetchUsers();
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <ReleasesOverviewForm
                    users={this.props.users}
                    projects={this.props.projects}
                    releases={this.props.releases}
                    displayError={this.props.displayError}
                    fetchReleases={this.props.fetchReleases}
                    createRelease={this.props.createRelease}
                />
            </React.Fragment>
        )
    }

}

function mapStateToProps(state): ReleasesViewStateProps {
    return {
        users: userSelectors.getAllUsers(state),
        projects: projectSelectors.getAllProjects(state),
        releases: releasesSelectors.getReleases(state),
        isLoading: userSelectors.usersIsFetching(state) || projectSelectors.projectsIsFetching(state)
    }
}


function mapDispatchToProps(dispatch: any): ReleasesViewDispatchProps {
    return {
        fetchUsers: () => {
            dispatch(userActions.fetchUsers())
        },
        fetchProjects: () => {
            dispatch(projectActions.fetchProjects())
        },
        fetchReleases(): any {
            dispatch(releasesActions.fetchReleases())
        },
        createRelease(release: ReleaseRequest, okCallback?, errorCallback?): any {
            dispatch(releasesActions.createRelease(release, okCallback, errorCallback))
        },
        displayError: (msg: string) => {
            dispatch(notificationActions.error(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesView);