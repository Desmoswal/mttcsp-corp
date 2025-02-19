import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { AuthService } from '../../auth.service';
import { Employee } from '../../employee.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.css']
})
export class AvailablejobsComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService, private router: Router) { }

  userSub: Subscription

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userSub = this.authService.getCurrentUserListener().subscribe(user => {
      this.currentUser = user;
      this.userLangs = user.languages;
      this.getAvailableJobs();
    })
  }

  cellSpacing = [10,10]

  jobs: Job[]  = []
  currentUser: Employee;
  userLangs = ['Norwegian', "Dutch", 'English','Danish']

  acceptJob(job: Job){
    this.jobService.setWorkspaceJob(job);
    this.jobService.setIsReview(false);
    const modifiedJob: Job = {
      _id: job._id,
      clientId: job.clientId,
      folder: job.folder,
      price: job.price,
      sourceLang: job.sourceLang,
      reqLang: job.reqLang,
      status: 'IN PROGRESS',
      employeeId: this.currentUser._id,
      creationDate: job.creationDate,
      startDate: this.getFormattedDate(),
      completionDate: job.completionDate,
      reviewBy: job.reviewBy
    }
    this.jobService.updateJob(modifiedJob)
    this.router.navigate(['/workspace'])
  }

  getJobByEmployee(){
    this.jobService.getJobsByEmployee(this.currentUser._id).then(jobList => {
      this.jobs = jobList;
    });
  }

  getAvailableJobs(){
    this.jobService.getAvailableJobs().then(jobList => {
      const filteredList = jobList.filter(job =>
        this.userLangs.includes(job.reqLang.toLowerCase()));

      this.jobs = filteredList.filter(job =>
        this.userLangs.includes(job.sourceLang.toLowerCase()))
    });
    console.log("user langs: " + this.userLangs)
  }

  getEmployeeHistory(){
    this.jobService.getEmployeeJobHistory(this.currentUser._id).then(jobList => {
      this.jobs = jobList;
    });
  }

  getFormattedDate(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const formattedDate = pipe.transform(now, 'dd-MM-yyyy')
    return formattedDate;
   }
}
