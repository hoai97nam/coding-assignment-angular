import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { NgModule } from "@angular/core";
import { TasksService } from "./tasks.service";

const routes: Routes = [
  {
    path: 'task',
    children: [
      {
        path: '',
        component: TaskListComponent,
      },
      {
        path: ':id',
        component: TaskDetailComponent,
        canDeactivate: [TasksService] //Prevent Leaving While Editing
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }   
