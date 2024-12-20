import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type reducersType = typeof reducers;
export type appStateType = ReturnType<reducersType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypesInfer<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesType<T>>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store;

export default store;
