import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagestatisticsComponent } from './languagestatistics.component';

describe('LanguagestatisticsComponent', () => {
  let component: LanguagestatisticsComponent;
  let fixture: ComponentFixture<LanguagestatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagestatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagestatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
