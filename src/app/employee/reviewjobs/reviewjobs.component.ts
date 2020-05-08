import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewjobs',
  templateUrl: './reviewjobs.component.html',
  styleUrls: ['./reviewjobs.component.css']
})
export class ReviewjobsComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.getCurrentEmployee()
    this.getJobsForReview()
  }

  jobsForReview: Job[] = []
  currentUser: Employee;
  userLangs = []

  getJobsForReview(){
    this.jobService.getJobsForReview().then(jobList => {
      console.log(jobList)
      this.jobsForReview = jobList.filter(job =>
        job.employeeId == this.currentUser._id
      )
      console.log(this.jobsForReview)
    });
  }

  getCurrentEmployee(){
    this.currentUser = this.authService.getCurrentUser();
    this.userLangs = this.currentUser.languages;
  }

  acceptJob(job: Job){
    this.jobService.setWorkspaceJob(job);
    this.jobService.setIsReview(true);
    this.router.navigate(['/workspace'])
  }
}
