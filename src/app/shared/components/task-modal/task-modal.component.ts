import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/backend.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  @Input() users: User[];
  @Output() closeModal = new EventEmitter();
  @Output() createTask = new EventEmitter<any>();

  showModal = false;
  newTask = {
    description: '',
    assigneeId: undefined,
    completed: false
  };
  taskStatus = [
    { text: 'Complete', value: true },
    { text: 'Incomplete', value: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.showModal = false;
    this.closeModal.emit();
  }

  onSubmit() {
    this.createTask.emit(this.newTask);
    this.onCloseModal();
  }

}
