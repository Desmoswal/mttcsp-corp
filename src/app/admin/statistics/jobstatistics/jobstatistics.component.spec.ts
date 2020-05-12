import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstatisticsComponent } from './jobstatistics.component';

describe('JobstatisticsComponent', () => {
  let component: JobstatisticsComponent;
  let fixture: ComponentFixture<JobstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
