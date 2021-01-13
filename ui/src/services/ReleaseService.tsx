import BackendProvider from './BackendProvider';
import {Release, ReleaseRequest} from '../store/releases/Types';


export default class ReleaseService {

    static async createRelease(
        release: ReleaseRequest,
        okCallback: (release: Release) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/release', null, null, JSON.stringify(release))

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Release);
        } else {
            errorCallback('Ошибка при создании релиза')
        }
    }

    static async getRelease(
        idRelease: number,
        okCallback: (release: Release) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/release/' + idRelease.toString())

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Release);
        } else {
            errorCallback('Ошибка при получении релиза')
        }
    }

    static async getReleases(
        okCallback: (releases: Release[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/release/list')

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Release[]);
        } else {
            errorCallback('Ошибка при получении списка релизов')
        }
    }

    static async deleteRelease(
        idRelease: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/release/' + idRelease.toString())

        if (result.ok) {
            okCallback(idRelease);
        } else {
            errorCallback('Ошибка при удалении релиза')
        }
    }

    static async updateReleaseDescription(
        idRelease: number,
        description: string,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/release/' + idRelease.toString() + '/description/', null, {
            description: description
        })

        if (result.ok) {
            okCallback(idRelease);
        } else {
            errorCallback('Ошибка при обновлении описания релиза')
        }
    }

    static async finishRelease(
        id: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/release/' + id.toString() + '/finish/')

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback('Ошибка при закрытии релиза')
        }
    }

    static async addTaskToRelease(
        releaseId: number,
        taskId: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/release/'+ releaseId.toString() + '/task/' + taskId.toString())

        if (result.ok) {
            okCallback(releaseId);
        } else {
            errorCallback('Ошибка при добавлении задачи в релиз')
        }
    }

    static async removeTaskToRelease(
        releaseId: number,
        taskId: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/release/'+ releaseId.toString() + '/task/' + taskId.toString())

        if (result.ok) {
            okCallback(releaseId);
        } else {
            errorCallback('Ошибка при удалении задачи из релиза')
        }
    }
}
