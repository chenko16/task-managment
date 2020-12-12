import * as React from "react";
import {SystemRole, User} from "../../store/users/Types";
import {Project, ProjectRequest} from "../../store/project/Types";
import {Release, ReleaseRequest} from "../../store/releases/Types";
import MaterialTable from "material-table";
import {Chip, Fab} from "@material-ui/core";
import AddBtn from "@material-ui/icons/Add";
import {forwardRef} from "react";
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from "@material-ui/icons";
import AddReleaseDialog from "./AddReleaseDialog";


const tableIcons = {
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <Delete {...props} ref={ref}/>),
    Add: forwardRef((props, ref) => <Add {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>)
}

export interface ReleasesOverviewFormProps {
    users: User[],
    projects: Project[],
    releases: Release[],
    currentUser: string,
    role: SystemRole,

    displayError(msg: string): any,

    fetchReleases(): any,

    createRelease(release: ReleaseRequest, okCallback?, errorCallback?): any
}

export interface ReleasesOverviewFormState {
    openAdd: boolean,
    currentRelease?: Release
    columns: any[]
}

export class ReleasesOverviewForm extends React.Component<ReleasesOverviewFormProps, ReleasesOverviewFormState> {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            columns: [
                {title: 'id', field: 'id', hidden: true},
                {title: 'Имя', field: 'name'},
                {title: 'Проект', field: 'project', render: (rowData) => (rowData.project.name)},
                {title: 'Описание', field: 'description'},
                {
                    title: 'Ответственный',
                    field: 'reporter',
                    render: (rowData) => (<Chip label={rowData.reporter.login} color={"primary"}/>)
                },
                {
                    title: 'Открыт', field: 'created', type: 'date'
                },
                {
                    title: 'Закрыт', field: 'finished', type: 'date'
                }
            ]
        }
    }


    render(): React.ReactNode {
        // console.log(JSON.stringify(this.state, null, 2))
        // console.log(JSON.stringify(this.props, null, 2))
        return (
            <React.Fragment>
                <MaterialTable
                    icons={tableIcons}
                    title="Релизы"
                    options={{
                        search: true,
                        paging: false,
                        showTitle: true,
                        actionsColumnIndex: -1,
                        header: true
                    }}
                    columns={this.state.columns}
                    data={this.props.releases}
                    localization={{
                        toolbar: {
                            searchTooltip: "Поиск",
                            searchPlaceholder: "Найти релиз"
                        },
                        body: {
                            emptyDataSourceMessage: "Список релизов пуст",
                            addTooltip: "",
                            deleteTooltip: "Удалить",
                            editTooltip: "Редактировать",
                            editRow: {
                                deleteText: "Вы уверены, что хотите удалить релиз?",
                                cancelTooltip: "Отмена",
                                saveTooltip: "Подтвердить"
                            }
                        },
                        header: {
                            actions: ''
                        }
                    }}
                    onRowClick={(event, rowData: Release) => {
                       console.log(rowData)
                    }}
                />

                {this.state.openAdd && <AddReleaseDialog
                    projects={this.props.projects}
                    users={this.props.users}
                    reporterLogin={this.props.currentUser}
                    displayError={this.props.displayError}
                    close={(value)=> {this.setState({openAdd: value})}}
                    onClose={(value, releaseRequest) => {
                        if (value === 'Ok' && releaseRequest) {
                            console.log(releaseRequest)
                            this.props.createRelease(releaseRequest, () => {
                                this.props.fetchReleases();
                            });
                        }
                    }}
                />}

                <Fab
                    color="primary"
                    aria-label="Add"
                    style={{
                        position: "fixed", bottom: 24, right: 24
                    }}
                    onClick={(e) => {
                        this.setState({openAdd: true})
                    }}
                >
                    <AddBtn/>
                </Fab>
            </React.Fragment>
        )
    }

}