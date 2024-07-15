import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from 'src/app/tasks/store/task.actions';
import * as TasksSelector from 'src/app/tasks/store/task.selectors';
import { Task, User } from 'src/app/backend.service';

@Injectable({
    providedIn: 'root'
})
export class TaskFacadeService {
    tasks$: Observable<Task[]> = this.store.select(TasksSelector.selectAllTasks);;
    users$: Observable<User[]> = this.store.select(TasksSelector.selectAllUsers);

    constructor(private store: Store) {
    }

    loadTasks() {
        this.store.dispatch(TaskActions.loadTasks());
    }

    getTaskById(id: number) {
        return this.store.select(TasksSelector.selectTaskById(id));
    }

    loadUsers() {
        this.store.dispatch(TaskActions.loadUsers());
    }

    assignTask(taskId: number, userId: number) {
        this.store.dispatch(TaskActions.assignTask({ taskId: taskId, userId: userId }));
    }

    completeTask(taskId: number, status: boolean) {
        this.store.dispatch(TaskActions.completeTask({ taskId: taskId, status: status }));
    }

    createTask(newTaskTitle: Task) {
        this.store.dispatch(TaskActions.addTask({ task: newTaskTitle }));
    }
}
