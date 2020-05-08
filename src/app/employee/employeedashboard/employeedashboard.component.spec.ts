import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashboardComponent } from './employeedashboard.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeedashboardComponent', () => {
  let component: EmployeedashboardComponent;
  let fixture: ComponentFixture<EmployeedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ EmployeedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
