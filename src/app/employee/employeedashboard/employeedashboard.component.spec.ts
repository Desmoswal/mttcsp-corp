import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashboardComponent } from './employeedashboard.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('EmployeedashboardComponent', () => {
  let component: EmployeedashboardComponent;
  let fixture: ComponentFixture<EmployeedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot()],
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
