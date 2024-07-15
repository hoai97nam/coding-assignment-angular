import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TruncatePipe,
    HeaderComponent,
    SidebarComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TruncatePipe,
    HeaderComponent,
    SidebarComponent,
    TaskModalComponent
  ]
})
export class SharedModule { }
