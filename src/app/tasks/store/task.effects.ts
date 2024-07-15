import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { BackendService, Task } from 'src/app/backend.service';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) { }

  // Load Tasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks), 
      mergeMap(() => this.backendService.tasks()
        .pipe( 
          map(tasks => TaskActions.loadTasksSuccess({ tasks })), 
          catchError(error => of(TaskActions.loadTasksFailure({ error }))) 
        )
      )
    )
  );

  // Load Users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadUsers), 
      mergeMap(() => this.backendService.users()
        .pipe( 
          map(users => TaskActions.loadUsersSuccess({ users })), 
          catchError(error => of(TaskActions.loadUsersFailure({ error }))) 
        )
      )
    )
  );

  // Add New Task
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap((action) => this.backendService.newTask(action.task)
        .pipe(
          map((newTask: Task) => TaskActions.addTasksSuccess({ task: newTask })),
          // catchError(error => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  );

  // Assign Task
  assignTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.assignTask),
      switchMap((action) => this.backendService.assign(action.taskId, action.userId)
        .pipe(
          map((newTask: Task) => TaskActions.assignTaskSuccess({ taskId: action.taskId, userId: action.userId })),
          // catchError(error => of(TaskActions.assignTaskFailure({ error })))
        )
      )
    )
  );

  // Complete Task
  completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.completeTask),
      switchMap((action) => this.backendService.complete(action.taskId, action.status)
        .pipe(
          map((newTask: Task) => TaskActions.completeTaskSuccess({ taskId: action.taskId, status: action.status })),
          // catchError(error => of(TaskActions.completeTaskFailure({ error })))
        )
      )
    )
  );
}
