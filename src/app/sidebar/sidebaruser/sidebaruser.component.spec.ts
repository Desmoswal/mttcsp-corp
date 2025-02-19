import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaruserComponent } from './sidebaruser.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';

describe('SidebaruserComponent', () => {
  let component: SidebaruserComponent;
  let fixture: ComponentFixture<SidebaruserComponent>;
  let de: DebugElement

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
      },
      getCurrentUserListener() {
        return {subscribe: () => {}}
      }
    }

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SidebaruserComponent ],
      providers: [ {provide: AuthService, useValue: serviceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebaruserComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.currentUser = serviceStub.getCurrentUser();
    expect(component).toBeTruthy();
  });

  /*it('should have stub data', () => {
    component.currentUser = serviceStub.getCurrentUser();
    const user: Employee = {_id: 'test123', firstName: 'Test', lastName: 'John', email: 'test@email.com', password: '123', address: 'testaddress', city: 'testcity', country: 'testcountry', zip: 123, languages: ['hungarian', 'english'], profilePic: 'none', role: 'admin'}
    console.log('currentUser')
    console.log(component.currentUser)
    console.log('User')
    console.log(user)
    expect(component.currentUser).toEqual(user)
  })*/
});
