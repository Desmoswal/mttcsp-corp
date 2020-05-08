import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adminstatistics',
  templateUrl: './adminstatistics.component.html',
  styleUrls: ['./adminstatistics.component.css']
})
export class AdminstatisticsComponent implements OnInit {

  constructor() { }

  public primaryXAxis: Record<string, any>;
    public chartData: Record<string, any>[];
    public primaryYAxis: Record<string, any>;
    public legendSettings: Record<string, any>;
    public tooltip: Record<string, any>;
    public title: string;
    public marker: Record<string, any>;
    public piedata: Record<string, any>[];
    ngOnInit(): void {
        // Tooltip for chart
        this.tooltip = {
            enable: true
        }
        this.chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.primaryYAxis = {
            labelFormat: '${value}K'
        };
        this.marker = {
          visible: true,
          width: 10,
        height: 10,
            dataLabel:{
                visible: true
            }
        };
        this.legendSettings = {
            visible: true
        };
        this.title = 'Sales Analysis';


        //pie
        this.piedata = [
          { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
          { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
          { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
          { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
          { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' },
          { x: 'Nov', y: 9, text: 'Nov: 9' }, { x: 'Dec', y: 3.5, text: 'Dec: 3.5' }];

        this.legendSettings = {
            visible: false
        };
        this.tooltip = {
          enable: true, header: "Languages"
        }
        this.center = {x: '60%', y: '60%'};
        this.startAngle = 0;
        this.endAngle = 360;
        this.explode = true;
        this.enableAnimation = false;
        this.title = 'Mobile Browser Statistics';
    }

    public pieData: Record<string, any>[];
    public startAngle: number;
    public endAngle: number;
    public center: Record<string, any> ;
    public explode: boolean ;
    public enableAnimation: boolean ;
}
