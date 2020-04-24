import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmenulistComponent } from './sidebarmenulist.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarmenulistComponent', () => {
  let component: SidebarmenulistComponent;
  let fixture: ComponentFixture<SidebarmenulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SidebarmenulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarmenulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
