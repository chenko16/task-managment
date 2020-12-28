import * as React from "react";
import {forwardRef} from "react";
import {Add, ArrowDownward, Check, Clear, Delete, Edit, Remove, Search} from "@material-ui/icons";
import MaterialTable from "material-table";
import {Fab} from "@material-ui/core";
import AddBtn from "@material-ui/icons/Add";
import {BusinessRole, Project, ProjectRequest, UserProject} from "../../store/project/Types";
import AddProjectDialog from "./AddProjectDialog";
import {SystemRole, User} from "../../store/users/Types";
import EditProjectDialog from "./EditProjectDialog";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmDialog from "../ConfirmDialog";


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
    participants?: UserProject[],
    openEditProject: boolean,
    userRoleProjects: Project[],
    currentProject?: Project,
    role: SystemRole,
    currentUser: string,

    currentProjectChanged(currentProject): any,

    openEditProjectChanged(openEditProject): any,

    displayError(msg: string): any,

    createProject(project: ProjectRequest, okCallback?, errorCallback?): any,

    updateDescription(id: number, description: string, okCallback?, errorCallback?): any,

    updateAssignee(id: number, userId: number, okCallback?: (project: Project) => void, errorCallback?): any,

    updateReporter(id: number, userId: number, okCallback?, errorCallback?): any,

    updateProjectStatus(id: number, status: boolean, okCallback?, errorCallback?): any,

    addParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    deleteParticipant(id: number, userId: number, okCallback?, errorCallback?): any,

    setParticipantRole(id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?): any,

    getParticipants(id: number, okCallback?, errorCallback?): any,

    fetchProject(id: number, okCallback?, errorCallback?): any,

    deleteProject(id: number, okCallback?, errorCallback?): any,

    fetchProjectsByUser(userId: number): any,

    fetchProjects(): any
}

export interface ProjectsFormState {
    openAdd: boolean,
    openEdit: boolean,
    currentProject?: Project
    columns: any[],
    confirmDelete: boolean,
    projectToDelete?: number
}

export default class ProjectsForm extends React.Component<ProjectsFormProps, ProjectsFormState> {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            openEdit: this.props.openEditProject,
            currentProject: this.props.currentProject,
            confirmDelete: false,
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
        this.handleConfirmDialogDeleteClose = this.handleConfirmDialogDeleteClose.bind(this);
    }

    componentDidMount(): void {
        if (this.props.role === SystemRole.USER) {
            this.props.fetchProjectsByUser(this.props.users.filter((user) => {
                return user.login === this.props.currentUser
            })[0].id)
        }
    }

    handleConfirmDialogDeleteClose(value) {
        this.setState({confirmDelete: false});
        if (value === 'Ok') {
            this.props.deleteProject(this.state.projectToDelete);
        }
    }

    render(): React.ReactNode {
        // console.log(JSON.stringify(this.state, null, 2))
        // console.log(JSON.stringify(this.props, null, 2))
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
                    data={this.props.role === SystemRole.USER ?
                        this.props.userRoleProjects : this.props.projects}
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
                    actions={[
                        {
                            icon: () => <CloseIcon style={{marginRight: 6}}/>,
                            hidden: this.props.role !== SystemRole.MANAGER,
                            tooltip: 'Удалить проект',
                            onClick: (event, rowData: Project) => {
                                this.setState({projectToDelete: rowData.id, confirmDelete: true})
                            }
                        }
                    ]}
                    onRowClick={(event, rowData: Project) => {
                        if (this.props.role === SystemRole.MANAGER) {
                            this.props.openEditProjectChanged(true);
                            this.props.currentProjectChanged(rowData);
                            this.props.getParticipants(rowData.id);
                            this.setState({currentProject: rowData, openEdit: true})
                        }
                    }}
                />

                {this.state.openAdd && <AddProjectDialog
                    displayError={this.props.displayError}
                    users={this.props.users}
                    reporterLogin={this.props.currentUser}
                    close={value => this.setState({openAdd: value})}
                    onClose={(value, projectRequest, assignee, reporter, description) => {
                        if (value === 'Ok' && projectRequest && assignee && reporter && description) {
                            this.props.createProject(projectRequest, (project) => {
                                this.props.updateReporter(project.id, reporter.id, () => {
                                    this.props.updateAssignee(project.id, assignee.id, () => {
                                        this.props.updateDescription(project.id, description, () => {
                                            this.props.fetchProjects();
                                        })
                                    })
                                })
                            })
                            //this.props.createUser(data);
                        }
                    }}
                />}

                {this.state.openEdit && <EditProjectDialog
                    participants={this.props.participants}
                    addParticipant={(id, participant) => {
                        this.props.addParticipant(id, participant, () => {
                            this.props.getParticipants(id);
                        });
                    }}
                    fetchProject={this.props.fetchProject}
                    deleteParticipant={this.props.deleteParticipant}
                    getParticipants={this.props.getParticipants}
                    setParticipantRole={this.props.setParticipantRole}
                    currentProject={this.state.currentProject}
                    displayError={this.props.displayError}
                    users={this.props.users}
                    updateProjectStatus={this.props.updateProjectStatus}
                    close={(e) => {
                        this.setState({openEdit: e})
                        this.props.openEditProjectChanged(e);
                        this.props.currentProjectChanged(undefined);
                    }}
                    onClose={(value, description, assignee) => {
                        if (value === 'Ok' && description && assignee && this.state.currentProject) {
                            if (this.state.currentProject?.description !== description)
                                this.props.updateDescription(this.state.currentProject?.id, description);
                            if (this.state.currentProject?.assignee !== assignee)
                                this.props.updateAssignee(this.state.currentProject?.id, assignee.id);
                        }
                    }}
                />}

                <ConfirmDialog
                    warningText={"Вы уверены, что хотите удалить проект?"}
                    open={this.state.confirmDelete}
                    okString={"Да"}
                    cancelString={"Отмена"}
                    onClose={this.handleConfirmDialogDeleteClose}
                />

                {this.props.role === SystemRole.MANAGER && <Fab
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
                </Fab>}
            </React.Fragment>
        )
    }
}
