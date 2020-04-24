import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagemanagementComponent } from './languagemanagement.component';

describe('LanguagemanagementComponent', () => {
  let component: LanguagemanagementComponent;
  let fixture: ComponentFixture<LanguagemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
