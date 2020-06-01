import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService) { }

  userSub: Subscription
  currentUser: Employee;
  userLangs = ['Norwegian', "Dutch", 'English','Danish']

  cellSpacing = [10,10]

  jobs: Job[]  = []
  jobsForReview: Job[] = []

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userSub = this.authService.getCurrentUserListener().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)
    })
    this.getAvailableJobs();
    this.getJobsForReview();
  }


  getAvailableJobs(){
    this.jobService.getAvailableJobs().then(jobList => {
      const filteredList = jobList.filter(job =>
        this.userLangs.includes(job.reqLang));

      this.jobs = filteredList.filter(job =>
        this.userLangs.includes(job.sourceLang))
        console.log('this jobs: ' + this.jobs)
    });
  }

  getJobsForReview(){
    this.jobService.getJobsForReview().then(jobList => {
      console.log(jobList)
      this.jobsForReview = jobList.filter(job =>
        job.employeeId == this.currentUser._id
      )
      console.log(this.jobsForReview)
    });
  }

}
