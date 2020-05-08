import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaruserComponent } from './sidebaruser.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebaruserComponent', () => {
  let component: SidebaruserComponent;
  let fixture: ComponentFixture<SidebaruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SidebaruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
