import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewjobsComponent } from './reviewjobs.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';

describe('ReviewjobsComponent', () => {
  let component: ReviewjobsComponent;
  let fixture: ComponentFixture<ReviewjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClient],
      declarations: [ ReviewjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
