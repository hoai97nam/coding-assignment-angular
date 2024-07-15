import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardComponent } from './dasboard.component';
import { RouterModule } from '@angular/router';

describe('DasboardComponent', () => {
  let component: DasboardComponent;
  let fixture: ComponentFixture<DasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
