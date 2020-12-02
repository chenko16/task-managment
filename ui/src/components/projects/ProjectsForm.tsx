import * as React from "react";
import {forwardRef} from "react";
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from "@material-ui/icons";
import MaterialTable from "material-table";
import {Avatar, Fab} from "@material-ui/core";
import AddBtn from "@material-ui/icons/Add";
import {Project} from "../../store/project/Types";
import AddProjectDialog from "./AddProjectDialog";
import Utils from "../../store/users/Utils";
import {User} from "../../store/users/Types";


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

export interface ProjectsFormProps {
    projects: Project[],
    users: User[],

    displayError(msg: string): any
}

export interface ProjectsFormState {
    openAdd: boolean,
    openEdit: boolean,
    currentProject?: Project
    columns: any[]
}

export default class ProjectsForm extends React.Component<ProjectsFormProps, ProjectsFormState> {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            openEdit: false,
            columns: [
                {title: 'id', field: 'id', hidden: true},
                {title: 'reporter', field: 'reporter', hidden: true},
                {title: 'assignee', field: 'assignee', hidden: true},
                {title: 'Название проекта', field: 'name'},
                {title: 'description', field: 'description', hidden: true},
                {
                    title: 'Активен', field: 'active', type: 'boolean'
                }
            ]
        }
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <MaterialTable
                    icons={tableIcons}
                    title="Проекты"
                    options={{
                        search: true,
                        paging: false,
                        showTitle: true,
                        actionsColumnIndex: -1,
                        header: true
                    }}
                    columns={this.state.columns}
                    data={this.props.projects}
                    localization={{
                        toolbar: {
                            searchTooltip: "Поиск",
                            searchPlaceholder: "Найти проект"
                        },
                        body: {
                            emptyDataSourceMessage: "Список проектов пуст",
                            addTooltip: "",
                            deleteTooltip: "Удалить",
                            editTooltip: "Редактировать",
                            editRow: {
                                deleteText: "Вы уверены, что хотите удалить проект?",
                                cancelTooltip: "Отмена",
                                saveTooltip: "Подтвердить"
                            }
                        },
                        header: {
                            actions: ''
                        }
                    }}
                    onRowClick={(event, rowData: Project) => {
                        this.setState({currentProject: rowData, openEdit: true})
                    }}
                />

                {this.state.openAdd && <AddProjectDialog
                    displayError={this.props.displayError}
                    users={this.props.users}
                    close={value => this.setState({openAdd: value})}
                    onClose={(value, data) => {
                        if (value === 'Ok') {
                            console.log(JSON.stringify(data,null,2))
                            //this.props.createUser(data);
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