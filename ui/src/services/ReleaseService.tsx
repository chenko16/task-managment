import BackendProvider from "./BackendProvider";
import {Release, ReleaseRequest} from "../store/releases/Types";


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
            errorCallback("Ошибка при создании релиза")
        }
    }

    static async  getRelease(
        idRelease: number,
        okCallback: (release: Release) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/release/' + idRelease.toString())

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Release);
        } else {
            errorCallback("Ошибка при получении релиза")
        }
    }

    static async  getReleases(
        okCallback: (releases: Release[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/release/list')
        let  data = "[\n" +
            "    {\n" +
            "        \"id\": 1,\n" +
            "        \"reporter\": {\n" +
            "            \"id\": 1,\n" +
            "            \"login\": \"Kakashi\",\n" +
            "            \"active\": true,\n" +
            "            \"systemRole\": \"ADMIN\"\n" +
            "        },\n" +
            "        \"project\": {\n" +
            "            \"id\": 1,\n" +
            "            \"assignee\": {\n" +
            "                \"id\": null,\n" +
            "                \"login\": \"Kakashi\",\n" +
            "                \"active\": true,\n" +
            "                \"systemRole\": \"ADMIN\"\n" +
            "            },\n" +
            "            \"reporter\": {\n" +
            "                \"id\": null,\n" +
            "                \"login\": \"Kakashi\",\n" +
            "                \"active\": true,\n" +
            "                \"systemRole\": \"ADMIN\"\n" +
            "            },\n" +
            "            \"name\": \"teamMinato\",\n" +
            "            \"description\": \"i will always watch after you\",\n" +
            "            \"active\": true\n" +
            "        },\n" +
            "        \"description\": \"описание\",\n" +
            "        \"name\" : \"firstRelease\",\n" +
            "        \"created\": \"2020-12-09T19:40:40.686524Z\",\n" +
            "        \"finished\": null\n" +
            "    }\n" +
            "]"
        okCallback(JSON.parse(data));
        // if (result.ok) {
        //     let body = await result.json();
        //     okCallback(body as Release[]);
        // } else {
        //     errorCallback("Ошибка при получении списка релизов")
        // }
    }

    static async  deleteRelease(
        idRelease: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/release/' + idRelease.toString())

        if (result.ok) {
            okCallback(idRelease);
        } else {
            errorCallback("Ошибка при удалении релиза")
        }
    }

    static async  updateReleaseDescription(
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
            errorCallback("Ошибка при обновлении описания релиза")
        }
    }

    static async  finishRelease(
        idRelease: number,
        okCallback: (idRelease: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/release/' + idRelease.toString() + '/finish/')

        if (result.ok) {
            okCallback(idRelease);
        } else {
            errorCallback("Ошибка при закрытии релиза")
        }
    }
}