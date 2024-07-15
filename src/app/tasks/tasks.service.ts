import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements CanDeactivate<TaskDetailComponent> {
  canDeactivate(component: TaskDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}
