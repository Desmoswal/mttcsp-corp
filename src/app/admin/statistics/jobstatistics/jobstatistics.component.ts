import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JobService } from '../../../job.service';
import { Job } from '../../../job.model';
import { EmployeeService } from '../../../employee.service';

@Component({
  selector: 'app-jobstatistics',
  templateUrl: './jobstatistics.component.html',
  styleUrls: ['./jobstatistics.component.css']
})
export class JobstatisticsComponent implements OnInit {

  constructor(public jobService: JobService, public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.calculateAvgWorkingTime()
    this.calculateAvgWaitingTime()
    this.getCurrentlyActive()
    this.getCurrentlyAvailable()
    this.calculateLoad()
  }

  waitingTimeList = []
  workingTimeList = []

  avgWaitingTime: number;
  avgWorkingTime: number;
  currentlyAvailable: number;
  currentlyActive: number;
  employeeLoad: number;

  calculateLoad(){
    this.jobService.getAvailableJobs().then(jobList => {
      this.employeeService.getAllEmployees().then(employeeList => {
        this.employeeLoad = jobList.length / employeeList.length
        console.log(this.employeeLoad)
      })
    })
  }

  getCurrentlyAvailable(){
    this.jobService.getAvailableJobs().then(jobList => {
      this.currentlyAvailable = jobList.length
    })
  }

  getCurrentlyActive(){
    this.jobService.getAllJobs().then(jobList => {
      const filteredList = jobList.filter(job =>
        job.status == "REVIEW" || job.status == "IN PROGRESS")
      console.log(filteredList)
      this.currentlyActive = filteredList.length
    })
  }

  calculateAvgWorkingTime(){
    this.jobService.getAllJobs().then(jobList => {
      jobList.forEach(element => {
        if(element.completionDate != '' || element.startDate == null){
          //console.log(element.completionDate)
          const comp = this.getTimeFromString(element.completionDate)
          const start = this.getTimeFromString(element.startDate)
          const diff = ((comp-start) / (60*60*24*1000))
          this.workingTimeList.push(diff)
        }
      })
      this.avgWorkingTime = this.calculateAVG(this.workingTimeList)
      console.log(this.avgWorkingTime)
    })
  }

  calculateAvgWaitingTime(){
    this.jobService.getAllJobs().then(jobList => {
      jobList.forEach(element => {
        if(element.startDate != '' || element.startDate == null ){
          const created = this.getTimeFromString(element.creationDate)
          const start = this.getTimeFromString(element.completionDate)
          const diff = ((start-created) / (60*60*24*1000))
          this.waitingTimeList.push(diff)
        }
      })
      this.avgWaitingTime = this.calculateAVG(this.waitingTimeList)
      console.log(this.avgWaitingTime)
    })
  }

  calculateAVG(array: any[]){
    let sum = 0;
    array.forEach(element => {
      sum += element
    })
    return sum / array.length
  }

  getFormattedDate(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const formattedDate = pipe.transform(now, 'dd-MM-yyyy')
    return formattedDate;
   }

   getTimeFromString(date: string){
     const pipe = new DatePipe('en-US');
     const day = date.split('-')[0]
     const month = date.split('-')[1]
     const year = date.split('-')[2]
     const time = new Date(+year, +month-1, +day).getTime()
     return time
   }

}
