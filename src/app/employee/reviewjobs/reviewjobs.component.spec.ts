import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewjobsComponent } from './reviewjobs.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Employee } from '../../employee.model';

describe('ReviewjobsComponent', () => {
  let component: ReviewjobsComponent;
  let fixture: ComponentFixture<ReviewjobsComponent>;

  let serviceStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ReviewjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const user: Employee = {
      _id: 'test123',
      firstName: 'Test',
      lastName: 'John',
      email: 'test@email.com',
      password: '123',
      address: 'testaddress',
      city: 'testcity',
      country: 'testcountry',
      zip: 123,
      languages: ['hungarian', 'english'],
      profilePic: 'none',
      role: 'admin'
    }

    serviceStub = {
      getCurrentUser(): Employee {
        return user
      }
    }

    fixture = TestBed.createComponent(ReviewjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.currentUser = serviceStub.getCurrentUser();
    expect(component).toBeTruthy();
  });
});
