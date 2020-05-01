import { Component, OnInit } from '@angular/core';
import { Job } from '../../job.model';
import { JobService } from '../../job.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-jobhistory',
  templateUrl: './jobhistory.component.html',
  styleUrls: ['./jobhistory.component.css']
})
export class JobhistoryComponent implements OnInit {

  constructor(public jobService: JobService) { }

  ngOnInit(): void {
  }

  jobHistory: Job[] = []
  employee: Employee

  getJobHistory(){
    this.jobHistory = this.jobService.getEmployeeJobHistory(this.employee._id)
  }
}
