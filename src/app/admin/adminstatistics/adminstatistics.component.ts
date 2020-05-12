import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adminstatistics',
  templateUrl: './adminstatistics.component.html',
  styleUrls: ['./adminstatistics.component.css']
})
export class AdminstatisticsComponent implements OnInit {

  constructor() { }
  public cellSpacing: number[] = [10, 10];
  ngOnInit(): void {
  }
}
