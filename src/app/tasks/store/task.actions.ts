import { createAction, props } from '@ngrx/store';
import { Task, User } from '../../backend.service';

// Load Tasks
export const loadTasks = createAction(
  '[Task] Load Tasks',
);

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

// Load Users
export const loadUsers = createAction(
  '[User] Load Users',
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// Add New Task
export const addTask = createAction(
  '[Task] Add New Task',
  props<{ task: Task }>()
);
export const addTasksSuccess = createAction(
  '[Task] Add New Task Success',
  props<{ task: Task }>()
);
// Assign Task
export const assignTask = createAction(
  '[Task] Assign Task',
  props<{ taskId: number, userId: number }>()
);

export const assignTaskSuccess = createAction(
  '[Task] Assign Task Success',
  props<{ taskId: number, userId: number }>()
);

// Change Task Status
export const completeTask = createAction(
  '[Task] Change Task Status',
  props<{ taskId: number, status: boolean }>()
);

export const completeTaskSuccess = createAction(
  '[Task] Change Task Status Success',
  props<{ taskId: number, status: boolean }>()
);
