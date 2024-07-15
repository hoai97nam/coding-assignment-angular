import { createReducer, on } from '@ngrx/store';
import { addTask, addTasksSuccess, assignTask, assignTaskSuccess, completeTask, completeTaskSuccess, loadTasks, loadTasksFailure, loadTasksSuccess, loadUsers, loadUsersFailure, loadUsersSuccess } from './task.actions';
import { Task } from 'src/app/backend.service';
import { TaskState } from '../models/task';
import { UserState } from '../models/user';

export const initialTaskState: TaskState = {
    tasks: undefined,
    loading: undefined
};

export const initialUserState: UserState = {
    users: undefined,
    loading: undefined
};

export const taskReducer = createReducer(
    initialTaskState,

    // Load Task
    on(loadTasks, (state) => ({ ...state, loading: true })),
    on(loadTasksSuccess, (state, { tasks }) => ({ ...state, loading: false, tasks: [...tasks] })),
    on(loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),
    
    on(addTask, (state, { task }) => ({ ...state, loading: true })),
    on(addTasksSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task], loading: false })),

    // Assign Task
    on(assignTask, (state, { taskId, userId }) => ({ ...state, loading: true })),
    on(assignTaskSuccess, (state, { taskId, userId }) =>
    ({
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
            task.id === taskId ? ({ ...task, assigneeId: userId }) : task)
    })),

    // Change Task Status
    on(completeTask, (state, { taskId, status }) => ({ ...state, loading: true })),
    on(completeTaskSuccess, (state, { taskId, status }) =>
    ({
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
            task.id === taskId ? ({ ...task, completed: status }) : task)
    })),
);

export const userReducer = createReducer(
    initialUserState,
    on(loadUsers, (state) => ({ ...state, loading: true })),
    on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users: [...users] })),
    on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
