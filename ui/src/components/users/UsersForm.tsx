import * as React from 'react';
import {forwardRef} from 'react';
import MaterialTable from 'material-table';
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import AddBtn from '@material-ui/icons/Add';
import {Avatar, Fab} from '@material-ui/core';
import Utils from '../../store/users/Utils';
import {SystemRole, User, UserRequest} from '../../store/users/Types';
import {withRouter} from 'react-router';
import UserEditForm, {UserEditFormState} from './UserEditForm';
import {Project, ProjectsByUsers} from '../../store/project/Types';
import AddUserDialog from './AddUserDialog';
import ConfirmDialog from '../ConfirmDialog';

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
    projects: Project[],
    userProjects: ProjectsByUsers | undefined,
    role: SystemRole,

    displayError(errorMessage: string): any,

    createUser(user: UserRequest): any,

    deleteUser(id: number, okCallback?, errorCallback?): any,

    updateUserStatus(id: number, status: boolean): any,

    updateUserRole(id: number, role: SystemRole): any,

    fetchProjectsByUser(userId: number): any
}

export interface UsersFormState {
    columns: any[],
    currentUser?: User,
    openEdit: boolean,
    openAdd: boolean,
    userToDelete?: number,
    confirmDelete: boolean
}

class UsersForm extends React.Component<UsersFormProps, UsersFormState> {
    constructor(props) {
        super(props);

        this.state = {
            confirmDelete: false,
            columns: [
                {title: 'id', field: 'id', hidden: true},
                {
                    title: '', field: 'imageUrl',
                    render: rowData =>
                        <Avatar src={'https://ui-avatars.com/api/?size=96&name=' + rowData.login
                        + '&font-size=0.33&background=' + Utils.getUserColor(rowData.login) + '&color=000&rounded=true'}/>
                },
                {title: 'Логин', field: 'login'},
                {
                    title: 'Роль', field: 'systemRole',
                    lookup: {
                        'USER': 'Пользователь',
                        'MANAGER': 'Менеджер',
                        'ADMIN': 'Администратор'
                    }
                },
                {
                    title: 'Активен', field: 'active', type: 'boolean'
                }
            ],
            openEdit: false,
            openAdd: false
        }
        this.handleConfirmDialogDeleteClose = this.handleConfirmDialogDeleteClose.bind(this);
    }


    handleConfirmDialogDeleteClose(value) {
        this.setState({confirmDelete: false});
        if (value === 'Ok') {
            this.props.deleteUser(this.state.userToDelete);
        }
    }


    render(): React.ReactNode {
        return (
            <React.Fragment>
                <MaterialTable
                    icons={tableIcons}
                    title='Пользователи'
                    options={{
                        search: true,
                        paging: false,
                        showTitle: true,
                        actionsColumnIndex: -1,
                        header: true
                    }}
                    columns={this.state.columns}
                    data={this.props.users}
                    localization={{
                        toolbar: {
                            searchTooltip: 'Поиск',
                            searchPlaceholder: 'Найти пользователя'
                        },
                        body: {
                            emptyDataSourceMessage: 'Список пользоватлей пуст',
                            addTooltip: '',
                            deleteTooltip: 'Удалить',
                            editTooltip: 'Редактировать',
                            editRow: {
                                deleteText: 'Вы уверены, что хотите удалить пользователя?',
                                cancelTooltip: 'Отмена',
                                saveTooltip: 'Подтвердить'
                            }
                        },
                        header: {
                            actions: ''
                        }
                    }}
                    actions={[
                        {
                            icon: () => <CloseIcon style={{marginRight: 6}}/>,
                            tooltip: 'Удалить пользователя',
                            hidden: this.props.role !== SystemRole.ADMIN,
                            onClick: (event, rowData: User) => {
                                this.setState({confirmDelete: true, userToDelete: rowData.id})
                            }
                        }
                    ]}
                    onRowClick={(event, rowData) => {
                        if (this.props.role === SystemRole.ADMIN) {
                            this.setState({currentUser: rowData, openEdit: true})
                        }
                    }}
                />

                <ConfirmDialog
                    warningText={'Вы уверены, что хотите удалить пользователя?'}
                    open={this.state.confirmDelete}
                    okString={'Да'}
                    cancelString={'Отмена'}
                    onClose={this.handleConfirmDialogDeleteClose}
                />

                {this.state.openEdit && <UserEditForm
                    projects={this.props.projects}
                    userProjects={this.props.userProjects}
                    fetchProjectsByUser={(userId) => {
                        this.props.fetchProjectsByUser(userId)
                    }}
                    updateUserStatus={(id, status) => {
                        this.props.updateUserStatus(id, status)
                    }}
                    onClose={(value, data: UserEditFormState) => {
                        this.props.updateUserRole(data.id, data.systemRole);
                    }}
                    close={value => this.setState({openEdit: value})}
                    currentUser={this.state.currentUser}
                />}

                {this.state.openAdd && <AddUserDialog
                    displayError={this.props.displayError}
                    close={value => this.setState({openAdd: value})}
                    onClose={(value, data) => {
                        if (value === 'Ok') {
                            this.props.createUser(data);
                        }
                    }}
                />}

                {this.props.role === SystemRole.ADMIN && <Fab
                    color='primary'
                    aria-label='Add'
                    style={{
                        position: 'fixed', bottom: 24, right: 24
                    }}
                    onClick={(e) => {
                        this.setState({openAdd: true})
                    }}
                >
                    <AddBtn/>
                </Fab>}
            </React.Fragment>
        )
    }
}

export default withRouter(UsersForm)
