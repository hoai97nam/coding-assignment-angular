import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { StoreModule } from '@ngrx/store';
import { TaskFacadeService } from '../store/task.facade';
import { Task, User } from 'src/app/backend.service';
import { TaskModalComponent } from 'src/app/shared/components/task-modal/task-modal.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskFacadeService: jasmine.SpyObj<TaskFacadeService>;

  const mockTasks: Task[] = [
    { id: 1, description: 'Task 1 Description', assigneeId: 111, completed: false },
    { id: 2, description: 'Another task', assigneeId: 222, completed: true }
  ];
  const mockUsers: User[] = [
    { id: 111, name: 'Jame' },
    { id: 222, name: 'Mike' }
  ];

  beforeEach(async () => {
    const taskFacadeSpy = jasmine.createSpyObj('TaskFacadeService', ['loadTasks', 'loadUsers', 'createTask', 'tasks$', 'users$']);
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskModalComponent, TruncatePipe],
      imports: [
        StoreModule.forRoot([])
      ],
      providers: [
        { provide: TaskFacadeService, useValue: taskFacadeSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskFacadeService = TestBed.inject(TaskFacadeService) as jasmine.SpyObj<TaskFacadeService>;
    taskFacadeService.tasks$ = of(mockTasks);
    taskFacadeService.users$ = of(mockUsers);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load tasks and users on init', () => {
    expect(taskFacadeService.loadTasks).toHaveBeenCalled();
    expect(taskFacadeService.loadUsers).toHaveBeenCalled();
  });

  it('should display tasks correctly', () => {
    const taskListItems = fixture.debugElement.queryAll(By.css('.preview-item'));
    expect(taskListItems.length).toBe(2);
  });

  it('should filter tasks based on description keyword', () => {
    component.handleFilterKeyword('Task 1');
    fixture.detectChanges();
    const taskListItems = fixture.debugElement.queryAll(By.css('.preview-item'));
    expect(taskListItems.length).toBe(1);
    expect(taskListItems[0].nativeElement.textContent).toContain('Task 1');
  });

  it('should open the create task modal', () => {
    const createButton = fixture.debugElement.query(By.css('.create-button'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.showModal).toBe(true);
  });

  it('should close the create task modal', () => {
    component.showModal = true;
    fixture.detectChanges();
    component.modalClosed();
    fixture.detectChanges();
    expect(component.showModal).toBe(false);
  });

  it('should create a new task and call facade service', () => {
    const newTaskData: Task = {
      id: 3,
      description: 'New task description',
      assigneeId: 111,
      completed: false
    };
    component.onTaskCreated(newTaskData);
    expect(taskFacadeService.createTask).toHaveBeenCalledWith({
      ...newTaskData,
      id: jasmine.any(Number)
    });
  });
});
