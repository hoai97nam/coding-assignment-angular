import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from '@ngrx/store';
import { TaskFacadeService } from '../store/task.facade';
import { Task, User } from 'src/app/backend.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskFacadeService: jasmine.SpyObj<TaskFacadeService>;

  const mockTask: Task = { id: 1, description: 'Test Description', assigneeId: 111, completed: false };
  const mockUsers: User[] = [
    { id: 111, name: 'John Doe' },
    { id: 222, name: 'Jane Smith' }
  ];

  beforeEach(async () => {
    const taskFacadeSpy = jasmine.createSpyObj('TaskFacadeService', ['getTaskById', 'users$', 'assignTask', 'completeTask']);
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot([])

      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })) 
          }
        },
        { provide: TaskFacadeService, useValue: taskFacadeSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    taskFacadeService = TestBed.inject(TaskFacadeService) as jasmine.SpyObj<TaskFacadeService>;
    taskFacadeService.getTaskById.and.returnValue(of(mockTask)); 
    taskFacadeService.users$ = of(mockUsers);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load task and user data on init', () => {
    expect(taskFacadeService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.taskWithUser).toBeTruthy(); 
    expect(component.userList).toEqual(mockUsers);
  });

  it('should toggle assignee editing mode', () => {
    component.toggleEdit('assignee');
    expect(component.isAssigneeInEditing).toBe(true); 
    component.toggleEdit('assignee');
    expect(component.isAssigneeInEditing).toBe(false); 
  });

  it('should toggle status editing mode', () => {
    component.toggleEdit('status');
    expect(component.isStatusInEditing).toBe(true);
    component.toggleEdit('status');
    expect(component.isStatusInEditing).toBe(false);
  });

  it('should update assignee and call facade service', () => {
    component.toggleEdit('assignee');
    component.assigneeSelect = mockUsers[1];
    component.toggleEdit('assignee');
    expect(taskFacadeService.assignTask).toHaveBeenCalledWith(1, 222); 
  });

  it('should update status and call facade service', () => {
    component.toggleEdit('status');
    component.statusSelect = { text: 'Complete', value: true }; 
    component.toggleEdit('status');
    expect(taskFacadeService.completeTask).toHaveBeenCalledWith(1, true);
  });

  it('should allow deactivation when not in edit mode', () => {
    component.isAssigneeInEditing = false;
    component.isStatusInEditing = false;
    const result = component.checkDeactivate(null, null, null); 
    expect(result).toBe(true);
  });

  it('should prevent deactivation and show alert when in edit mode', () => {
    component.isAssigneeInEditing = true;
    spyOn(window, 'alert');
    component.checkDeactivate(null, null, null);
    expect(window.alert).toHaveBeenCalledWith('[DIALOG]: NOT Finish Editing');
  });
});
