import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmenulistComponent } from './sidebarmenulist.component';

describe('SidebarmenulistComponent', () => {
  let component: SidebarmenulistComponent;
  let fixture: ComponentFixture<SidebarmenulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
