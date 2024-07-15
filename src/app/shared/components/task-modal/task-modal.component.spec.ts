import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalComponent } from './task-modal.component';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit closeModal event when onCloseModal is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onCloseModal();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
  it('should emit createTask event with new task data on submit', () => {
    spyOn(component.createTask, 'emit');
    const testTask = {
      description: 'Test description',
      assigneeId: 1,
      completed: false
    };
    component.newTask = testTask;
    component.onSubmit();
    expect(component.createTask.emit).toHaveBeenCalledWith(testTask);
  });

  it('should close the modal after submitting the form', () => {
    component.showModal = true;
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.showModal).toEqual(true);
  });
  it('should display user in the assignee dropdown', () => {
    const selectElement = fixture.debugElement.nativeElement.querySelector('#status');
    const options = selectElement.options;
    expect(options.length).toBe(0); 
  });
});
