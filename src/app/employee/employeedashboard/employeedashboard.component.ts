import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService) { }

  ngOnInit(): void {

  }

  cellSpacing = [10,10]

  jobs: Job[]  = []
  jobsForReview: Job[] = []

  getJobs(){
    this.jobService.getAvailableJobs().then(jobList => {
      this.jobs = jobList;
    })
  }

  getJobsForReview(){
    this.jobService.getJobsForReview().then(jobList => {
      this.jobsForReview = jobList
    })
  }

}
