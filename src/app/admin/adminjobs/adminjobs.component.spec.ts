import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminjobsComponent } from './adminjobs.component';

describe('AdminjobsComponent', () => {
  let component: AdminjobsComponent;
  let fixture: ComponentFixture<AdminjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
