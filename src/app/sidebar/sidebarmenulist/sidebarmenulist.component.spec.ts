import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmenulistComponent } from './sidebarmenulist.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../employee.model';
import { DebugElement } from '@angular/core';

describe('SidebarmenulistComponent', () => {
  let component: SidebarmenulistComponent;
  let fixture: ComponentFixture<SidebarmenulistComponent>;
  let de: DebugElement;

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
      role: 'Admin'
    }

    serviceStub = {
      getCurrentUser(): Employee {
        return user
      }
    }

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SidebarmenulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarmenulistComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.currentUser = serviceStub.getCurrentUser();
    expect(component).toBeTruthy();
  });
});
