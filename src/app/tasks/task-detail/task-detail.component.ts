import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { TasksService } from '../tasks.service';
import { TaskFacadeService } from '../store/task.facade';
import { map, switchMap } from 'rxjs/operators';
import { Task, TaskMapped, User } from 'src/app/backend.service';
import { addAssigneeMapped } from 'src/app/shared/helper/map';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  taskDetail: Task;
  isAssigneeInEditing: boolean = false;
  isStatusInEditing: boolean = false;
  subscription$ = new Subscription();
  taskById$: Observable<Task>;
  users$: Observable<User[]>;
  userList: User[];
  assigneeSelect: User;
  taskWithUser: TaskMapped;
  statusSelect: { text: string, value: boolean };

  taskStatus = [
    { text: 'Complete', value: true },
    { text: 'Incomplete', value: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private taskFacadeService: TaskFacadeService
  ) { }

  ngOnInit(): void {
    // Load Task By Id
    this.taskById$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => this.taskFacadeService.getTaskById(+id))
    )
    this.users$ = this.taskFacadeService.users$;
    // Get Task, User To Map New Object
    this.subscription$
      .add(
        combineLatest(this.taskById$, this.users$).subscribe(([task, users]) => {
          if (task && users) {
            this.userList = users;
            this.taskWithUser = addAssigneeMapped(task, users) as TaskMapped;
            this.assigneeSelect = users.find((user: User) => user.id === task.assigneeId);
            this.statusSelect = this.taskStatus.find(status => status.value === task.completed);
          }
        })
      )
  }
  // Handle Edit In Assignee and Status
  toggleEdit(label: string) {
    switch (label) {
      case 'assignee':
        this.isAssigneeInEditing = !this.isAssigneeInEditing;
        if (!this.isAssigneeInEditing) {
          const { assigneeId } = this.taskWithUser;
          this.taskWithUser = {
            ...this.taskWithUser,
            assigneeId: this.assigneeSelect.id,
            assigneeName: this.assigneeSelect.name,
          }
          if (this.assigneeSelect.id !== assigneeId)
            this.taskFacadeService.assignTask(this.taskWithUser.id, this.taskWithUser.assigneeId);
        }
        break;
      case 'status':
        this.isStatusInEditing = !this.isStatusInEditing;
        if (!this.isStatusInEditing) {
          const { completed } = this.taskWithUser;
          this.taskWithUser = {
            ...this.taskWithUser,
            completed: this.statusSelect.value
          }
          if (this.statusSelect.value !== completed) {
            this.taskFacadeService.completeTask(this.taskWithUser.id, this.taskWithUser.completed);
          }
        }
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  handleAlert() {
    alert('[DIALOG]: NOT Finish Editing');
    return of("" as any); // Satisfy Interface
  }
  // Check Editing Mode
  checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (!this.isAssigneeInEditing && !this.isStatusInEditing) || this.handleAlert();
  }
}
