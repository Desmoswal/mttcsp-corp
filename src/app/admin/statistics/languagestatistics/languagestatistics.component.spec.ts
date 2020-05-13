import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagestatisticsComponent } from './languagestatistics.component';
import { AccumulationChartComponent, AccumulationChart } from '@syncfusion/ej2-angular-charts';

describe('LanguagestatisticsComponent', () => {
  let component: LanguagestatisticsComponent;
  let fixture: ComponentFixture<LanguagestatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagestatisticsComponent, AccumulationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagestatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
