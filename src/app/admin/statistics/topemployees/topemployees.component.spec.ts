import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopemployeesComponent } from './topemployees.component';

describe('TopemployeesComponent', () => {
  let component: TopemployeesComponent;
  let fixture: ComponentFixture<TopemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
