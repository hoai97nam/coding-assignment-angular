import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../../backend.service';
import { TaskState } from '../models/task';
import { UserState } from '../models/user';

export const selectTasksState = createFeatureSelector<TaskState>('tasks');
export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectAllTasks = createSelector(
  selectTasksState,
  (state: TaskState) => state.tasks
);

// Select Users
export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UserState) => state.users
); 
// Select Task By Id
export const selectTaskById = (taskId: number) => createSelector(
  selectTasksState,
  (state: TaskState) => state.tasks.find(task => task.id === taskId)
);
