import BackendProvider from './BackendProvider';
import {Task, TaskRequest, TaskStatus, TaskType} from '../store/tasks/Types';

export default class TaskService {

    static async createTask(
        task: TaskRequest,
        okCallback: (task: Task) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/task', null, null, JSON.stringify(task))

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Task);
        } else {
            errorCallback('Ошибка при создании задачи')
        }
    }

    static async getTask(
        idTask: number,
        okCallback: (task: Task) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/task/' + idTask.toString())

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Task);
        } else {
            errorCallback('Ошибка при получении задачи')
        }
    }

    static async getTasks(
        okCallback: (tasks: Task[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/task')

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Task[]);
        } else {
            errorCallback('Ошибка при получении списка задач')
        }
    }

    static async deleteTask(
        idTask: number,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/task/' + idTask.toString())

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при удалении задачи')
        }
    }

    static async updateTaskDescription(
        idTask: number,
        description: string,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/task/' + idTask.toString() + '/description', null, {
            description: description
        })

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при обновлении описания задачи')
        }
    }

    static async updateTaskStatus(
        idTask: number,
        status: TaskStatus,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/task/' + idTask.toString() + '/status', null, {
            status: status
        })

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при обновлении статуса задачи')
        }
    }

    static async updateTaskType(
        idTask: number,
        type: TaskType,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/task/' + idTask.toString() + '/type', null, {
            type: type
        })

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при обновлении типа задачи')
        }
    }

    static async updateTaskTitle(
        idTask: number,
        title: string,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/task/' + idTask.toString() + '/title', null, {
            title: title
        })

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при обновлении названия задачи')
        }
    }

    static async setTaskAssignee (
        idTask: number,
        idUser: number,
        okCallback: (idTask: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/task/' + idTask.toString() + '/assignee/' + idUser.toString())

        if (result.ok) {
            okCallback(idTask);
        } else {
            errorCallback('Ошибка при изменении исполнителя задачи')
        }
    }
}
