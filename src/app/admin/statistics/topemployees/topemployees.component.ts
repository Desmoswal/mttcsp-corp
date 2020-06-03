import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../../job.service';
import { EmployeeService } from '../../../employee.service';
import { Job } from '../../../job.model';
import { Employee } from '../../../employee.model';
import { AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';


interface ArrayGroup {
  key?: string;
  values: Array<Record<string,any>>;
}


@Component({
  selector: 'app-topemployees',
  templateUrl: './topemployees.component.html',
  styleUrls: ['./topemployees.component.css']
})
export class TopemployeesComponent implements OnInit {

  constructor(private jobService: JobService, private employeeService: EmployeeService) { }

  jobList: Job[]
  employeeList: Employee[]
  employee: Employee;
  public legendSettings: Record<string, any>;
  public tooltip: Record<string, any>;
  public title: string;
  public piedata: Record<string, any>[] = [];
  public startAngle: number;
  public endAngle: number;
  public explode: boolean ;
  public enableAnimation: boolean ;
  numberOfEmployees = 10;

  @ViewChild('pieChart')
    public pie: AccumulationChartComponent | AccumulationChart;

  ngOnInit(): void {
    this.getAllEmployees()
    this.piedata = [];

    this.setPieData()
    this.refresh

    this.legendSettings = {
        visible: true
    };
    this.tooltip = {
      enable: true, header: "Employee"
    }
    //this.center = {x: '60%', y: '60%'};
    this.startAngle = 0;
    this.endAngle = 360;
    this.explode = true;
    this.enableAnimation = true;
    this.title = 'Top Employees';
  }

  public sliderChange(e: Event): void {
    this.numberOfEmployees = +(document.getElementById('pieslider') as HTMLInputElement).value;
    console.log(this.numberOfEmployees)
    if(e.type == 'change'){
      this.setPieData()
    }
  }

  setPieData(){
    this.jobService.getAllJobs().then(jobList => {
      this.jobList = jobList;
      const grouped: ArrayGroup[] = this.groupByArray(this.jobList, 'employeeId')
      grouped.forEach(element => {
        if(element.key != ''){
          this.employeeService.getEmployeeById(element.key).then(employeeList => {
            if(this.piedata.length < this.numberOfEmployees){
              this.piedata.push({x: employeeList[0].firstName+' '+ employeeList[0].lastName, y: element.values.length})
              this.refresh()
            }
            else if(this.piedata.length > this.numberOfEmployees) {
              this.piedata.pop();
              this.refresh()
            }
          })
        }
      })
    })
  }

  groupBy(xs, key){
    return xs.reduce(function(rv,x) {
      (rv[x[key]]=rv[x[key]]||[]).push(x);
      return rv;
    }, {});
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

  getAllEmployees(){
    this.employeeService.getAllEmployees().then(employeeList => {
      this.employeeList = employeeList;
    })
  }

  refresh(){
    this.pie.dataSource = this.piedata;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  }
}
