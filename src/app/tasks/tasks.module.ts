import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/task.effects';
import { taskReducer, userReducer } from './store/task.reducer';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('tasks', taskReducer),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([TasksEffects]),
  ]
})
export class TasksModule { }
