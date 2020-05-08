import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablejobsComponent } from './availablejobs.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('AvailablejobsComponent', () => {
  let component: AvailablejobsComponent;
  let fixture: ComponentFixture<AvailablejobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AvailablejobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
