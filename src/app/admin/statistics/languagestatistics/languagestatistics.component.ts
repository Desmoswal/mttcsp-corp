import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../../language.service';
import { Language } from '../../../language.model';
import { JobService } from '../../../job.service';
import { Job } from '../../../job.model';
import { AccumulationChartComponent, AccumulationChart } from '@syncfusion/ej2-angular-charts';

interface ArrayGroup {
  key?: string;
  values: Array<Record<string,any>>;
}

@Component({
  selector: 'app-languagestatistics',
  templateUrl: './languagestatistics.component.html',
  styleUrls: ['./languagestatistics.component.css']
})
export class LanguagestatisticsComponent implements OnInit {

  constructor(public languageService: LanguageService, public jobService: JobService) { }
  public pieData: Record<string, any>[];
  public pieData2: Record<string,any>[];
  public startAngle: number;
  public endAngle: number;
  public center: Record<string, any> ;
  public explode: boolean ;
  public enableAnimation: boolean ;
  public legendSettings: Record<string, any>;
  public tooltip: Record<string, any>;
  public title: string;

  public languages: Language[]
  public jobList: Job[];

  @ViewChild('pie')
  public pie: AccumulationChartComponent | AccumulationChart;
  @ViewChild('pie2')
  public pie2: AccumulationChartComponent | AccumulationChart;

  ngOnInit(): void {
    this.pieData = [];
    this.pieData2 = [];

    this.legendSettings = {
        visible: true
    };
    this.tooltip = {
      enable: true, header: "Languages"
    }
    this.startAngle = 270;
    this.endAngle = 90;
    this.explode = true;
    this.enableAnimation = true;
    this.title = 'Most requested languages';

    this.setPieData()
    this.setPieData2()
    this.pie.dataSource = this.pieData;
    this.pie2.dataSource = this.pieData2;
    this.refresh()
  }

  setPieData(){
    this.jobService.getAllJobs().then(jobList => {
      this.jobList = jobList;
      const grouped: ArrayGroup[] = this.groupByArray(this.jobList, 'reqLang')
      grouped.forEach(element => {
        this.pieData.push({x: element.key, y: element.values.length})
      })
      this.refresh()
    })
  }

  setPieData2(){
    this.jobService.getAllJobs().then(jobList => {
      this.jobList = jobList;
      const grouped: ArrayGroup[] = this.groupByArray(this.jobList, 'sourceLang')
      grouped.forEach(element => {
        this.pieData2.push({x: element.key, y: element.values.length})
      })
      this.refresh()
    })
  }

  groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
      const v = key instanceof Function ? key(x) : x[key];
      const el = rv.find((r) => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
         rv.push({ key: v, values: [x] });
        }
      return rv; },
    []);
  }

  refresh(){
    this.pie.dataSource = this.pieData;
    this.pie2.dataSource = this.pieData2;
    this.pie.removeSvg();
    this.pie2.removeSvg();
    this.pie.refreshSeries();
    this.pie2.refreshSeries();
    this.pie.refreshChart();
    this.pie2.refreshChart();
  }
}
