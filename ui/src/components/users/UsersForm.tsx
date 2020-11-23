import * as React from "react";
import {forwardRef} from "react";
import MaterialTable from "material-table";
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import Utils from "../../store/users/Utils";
import {User} from "../../store/users/Types";
import {withRouter} from "react-router";
import UserEditForm from "./UserEditForm";


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
    // projects: Projects[]
}

export interface UsersFormState {
    columns: any[],
    currentUser?: User,
    openEdit: boolean
}

class UsersForm extends React.Component<UsersFormProps, UsersFormState> {
    constructor(props) {
        super(props);
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
            openEdit: false
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
                    onClose={(value, data) => {
                        console.log(value);
                        console.log(data);
                    }}
                    close={value => this.setState({openEdit: false})}
                    currentUser={this.state.currentUser}
                />}
            </React.Fragment>
        )
    }
}

export default withRouter(UsersForm)