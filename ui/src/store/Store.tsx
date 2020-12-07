import * as auth from './auth/Reducer';
import * as notification from './notification/Reducer';
import * as user from './users/Reducer';
import * as releases from './releases/Reducer';
// import * as role from './role/Reducer';
import * as project from './project/Reducer'
import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";

export interface ApplicationState {
    auth: auth.AuthStoreState,
    project: project.ProjectStoreState
    notification: notification.NotificationState,
    user: user.UsersStoreState,
    releases: releases.ReleasesStoreState
    // role: role.RoleStoreState
}

export const reducers: Reducer<ApplicationState> =
    combineReducers<ApplicationState>({
        auth: auth.reducer,
        project: project.reducer,
        notification: notification.reducer,
        user: user.reducer,
        releases: releases.reducer
        // role: role.reducer
    })

const persistConfig = {
    key: 'root',
    storage
}

export const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
