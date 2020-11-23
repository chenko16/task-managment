import * as auth from './auth/Reducer'
// import * as kafka from './kafka/Reducer'
// import * as pipeline from './pipeline/Reducer'
// import * as kafkaViewer from './kafkaViewer/Reducer'
import * as notification from './notification/Reducer'
// import * as team from './group/Reducer'
import * as user from './users/Reducer'
// import * as tracing from './tracingSearch/Reducer'
// import * as tracingDatasource from './tracingDatasources/Reducer'
// import * as role from './role/Reducer'
// import * as config from './config/Reducer'
// import * as monitoring from './monitoring/Reducer'
// import * as project from './project/Reducer'
// import * as processing from './flow/Reducer'
// import * as index from './index/Reducer'
import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";

export interface ApplicationState {
    auth: auth.AuthStoreState,
    // kafka: kafka.KafkaStoreState,
    // kafkaViewer: kafkaViewer.KafkaViewerStoreState,
    // project: project.ProjectStoreState
    notification: notification.NotificationState,
    // team: team.GroupStoreState,
    user: user.UsersStoreState,
    // index: index.IndexStoreState,
    // tracingDatasource: tracingDatasource.TracingDatasourceStoreState,
    // tracing: tracing.TracingStoreState,
    // role: role.RoleStoreState,
    // monitoring: monitoring.MonitoringStoreState,
    // processing: processing.ProcessingStoreState,
    // config: config.ConfigStoreState,
    // pipeline: pipeline.PipelineStoreState
}

export const reducers: Reducer<ApplicationState> =
    combineReducers<ApplicationState>({
        auth: auth.reducer,
        // kafka: kafka.reducer,
        // kafkaViewer: kafkaViewer.reducer,
        // project: project.reducer,
        notification: notification.reducer,
        // team: team.reducer,
        user: user.reducer,
        // role: role.reducer,
        // index: index.reducer,
        // tracing: tracing.reducer,
        // tracingDatasource: tracingDatasource.reducer,
        // monitoring: monitoring.reducer,
        // config: config.reducer,
        // processing: processing.reducer,
        // pipeline: pipeline.reducer
    })

const persistConfig = {
    key: 'root',
    storage
}

export const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
