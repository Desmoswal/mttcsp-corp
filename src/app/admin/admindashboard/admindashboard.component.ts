import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public cellSpacing: number[] = [10, 10];

}
