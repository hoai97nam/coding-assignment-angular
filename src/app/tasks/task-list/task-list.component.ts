import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Task, TaskMapped, User } from 'src/app/backend.service';
import { TaskFacadeService } from '../store/task.facade';
import { addAssigneeMapped } from 'src/app/shared/helper/map';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]>;
  users$: Observable<User[]>;
  subscription$ = new Subscription();
  tasks: TaskMapped[];
  bkTasks: TaskMapped[];
  users: User[];
  showModal: boolean = false;
  taskDate = new Date();

  constructor(
    private taskFacadeService: TaskFacadeService
  ) {
  }

  ngOnInit(): void {
    // Load Tasks And Users From BE
    this.taskFacadeService.loadTasks();
    this.taskFacadeService.loadUsers();
    // Select Tasks And Users From Store
    this.tasks$ = this.taskFacadeService.tasks$;
    this.users$ = this.taskFacadeService.users$;
    
    this.subscription$
      .add(
        combineLatest(this.tasks$, this.users$)
          .subscribe(([tasks, users]) => {
            if (tasks && users) {
              this.tasks = this.bkTasks = addAssigneeMapped(tasks, users) as TaskMapped[];
              this.users = users;
            }
          })
      )
  }

  handleOpenCreateTaskModal() {
    this.showModal = true;
  }

  modalClosed() {
    this.showModal = false;
  }

  onTaskCreated(newTask: Task) {
    newTask = { ...newTask, id: +this.generateRandomID() };
    this.taskFacadeService.createTask(newTask);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
  // Filter Task In Description Using Keyword
  handleFilterKeyword($event) {
    this.tasks = [...this.bkTasks];
    if ($event) {
      const newResult = this.tasks.filter(task => task.description.includes($event));
      this.tasks = [...newResult];
    }
  }
  // Use Uuid For generating ID 
  private generateRandomID() {
    return Math.random().toString().slice(2, 9);
  }
}
