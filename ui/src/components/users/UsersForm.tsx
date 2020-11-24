import * as React from "react";
import {forwardRef} from "react";
import MaterialTable from "material-table";
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from "@material-ui/icons";
import AddBtn from "@material-ui/icons/Add";
import {Avatar, Fab, Link} from "@material-ui/core";
import Utils from "../../store/users/Utils";
import {User, UserRequest} from "../../store/users/Types";
import {withRouter} from "react-router";
import UserEditForm from "./UserEditForm";
import {BusinessRole, Project, ProjectsByUsers, RoleInProject} from "../../store/project/Types";
import AddUserDialog from "./AddUserDialog";

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

export interface UsersFormProps {
    users: User[],
    isLoading: boolean,

    displayError(errorMessage: string): any,
    createUser(user: UserRequest, okCallback?, errorCallback?): any
    // projects: Projects[]
}

export interface UsersFormState {
    columns: any[],
    currentUser?: User,
    openEdit: boolean,
    openAdd: boolean,

    projects: Project[],
    projectsByUser: ProjectsByUsers
}

class UsersForm extends React.Component<UsersFormProps, UsersFormState> {
    constructor(props) {
        super(props);

        let project1: Project = {
            id: 1,
            reporter: this.props.users[0],
            assignee: this.props.users[1],
            name: "teamMinato"
        };

        let project2: Project = {
            id: 2,
            reporter: this.props.users[2],
            assignee: this.props.users[0],
            name: "teamHatake"
        };

        let project3: Project = {
            id: 3,
            reporter: this.props.users[1],
            assignee: this.props.users[2],
            name: "teamUchiha"
        };

        let projects: Project[] = [];
        projects.push(project1, project2, project3);

        let roleInProject1: RoleInProject = {
            projectId: 1,
            role: BusinessRole.DEVELOPER
        }

        let roleInProject2: RoleInProject = {
            projectId: 2,
            role: BusinessRole.LEADER
        }

        let roleInProject3: RoleInProject = {
            projectId: 3,
            role: BusinessRole.DEVOPS
        }

        let roleInProjects: RoleInProject[] = [];
        roleInProjects.push(roleInProject1, roleInProject2, roleInProject3);

        let projectsByUsers: ProjectsByUsers = {
            assignee: [1, 2],
            reporters: [3],
            participants: roleInProjects
        }

        this.state = {
            columns: [
                {title: 'id', field: 'id', hidden: true},
                {
                    title: '', field: 'imageUrl',
                    render: rowData =>
                        <Avatar src={"https://ui-avatars.com/api/?size=96&name=" + rowData.login
                        + "&font-size=0.33&background=" + Utils.getUserColor(rowData.login) + "&color=000&rounded=true"}/>
                },
                {title: 'Логин', field: 'login'},
                {
                    title: 'Роль', field: 'systemRole',
                    lookup: {
                        "USER": 'Пользователь',
                        "MANAGER": 'Менеджер',
                        "ADMIN": 'Администратор'
                    }
                },
                {
                    title: 'Активен', field: 'active', type: 'boolean'
                }
            ],
            openEdit: false,
            openAdd: false,

            projects: projects,
            projectsByUser: projectsByUsers
        }
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <MaterialTable
                    tableRef={this.tableRef}
                    icons={tableIcons}
                    title="Метрики"
                    options={{
                        search: true,
                        paging: false,
                        showTitle: false,
                        actionsColumnIndex: -1,
                        header: true
                    }}
                    columns={this.state.columns}
                    data={this.props.users}
                    localization={{
                        toolbar: {
                            searchTooltip: "Поиск",
                            searchPlaceholder: "Найти пользователя"
                        },
                        body: {
                            emptyDataSourceMessage: "Список пользоватлей пуст",
                            addTooltip: "",
                            deleteTooltip: "Удалить",
                            editTooltip: "Редактировать",
                            editRow: {
                                deleteText: "Вы уверены, что хотите удалить пользователя?",
                                cancelTooltip: "Отмена",
                                saveTooltip: "Подтвердить"
                            }
                        },
                        header: {
                            actions: ''
                        }
                    }}
                    onRowClick={(event, rowData) => {
                        this.setState({currentUser: rowData, openEdit: true})
                    }}
                />

                {this.state.openEdit && <UserEditForm
                    projects={this.state.projects}
                    userProjects={this.state.projectsByUser}
                    onClose={(value, data) => {
                        console.log(data);
                    }}
                    close={value => this.setState({openEdit: value})}
                    currentUser={this.state.currentUser}
                />}

                {this.state.openAdd && <AddUserDialog
                    displayError={this.props.displayError}
                    close={value => this.setState({openAdd: value})}
                    onClose={(value, data) => {
                        console.log(data);
                        if (value === 'Ok') {
                            this.props.createUser(data);
                        }
                    }}
                />}

                <Fab
                    color="primary"
                    aria-label="Add"
                    style={{
                        position: "fixed", bottom: 24, right: 24
                    }}
                    // component={Link} {...{to: "/flow/new"} as any}
                    onClick={(e) => {this.setState({openAdd: true})}}
                >
                    <AddBtn/>
                </Fab>
            </React.Fragment>
        )
    }
}

export default withRouter(UsersForm)