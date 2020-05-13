import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobhistoryComponent } from './jobhistory.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Employee } from '../../employee.model';

describe('JobhistoryComponent', () => {
  let component: JobhistoryComponent;
  let fixture: ComponentFixture<JobhistoryComponent>;

  let serviceStub: any;

  beforeEach(async(() => {

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

    TestBed.configureTestingModule({
      declarations: [ JobhistoryComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.employee = serviceStub.getCurrentUser();
    expect(component).toBeTruthy();
  });
});
