import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentjobsComponent } from './currentjobs.component';

describe('CurrentjobsComponent', () => {
  let component: CurrentjobsComponent;
  let fixture: ComponentFixture<CurrentjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
