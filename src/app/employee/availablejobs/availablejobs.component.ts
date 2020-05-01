import { Component, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.css']
})
export class AvailablejobsComponent implements OnInit {

  constructor(public jobService: JobService) { }

  userLangs = ['Norwegian', "Dutch", 'English','Danish']

  ngOnInit(): void {
    //this.getJobByEmployee();
  }

  cellSpacing = [10,10]

  jobs: Job[]  = []
  jobsForReview: Job[] = []
  /*getAllJobs() {
    this.jobs = this.jobService.getAllJobs();
  }*/

  acceptJob(job: Job){
    console.log(job)
  }

  getJobByEmployee(){
    this.jobs = this.jobService.getJobByEmployee("5e9b21c62cd2752d18d6072d");
  }

  getAvailableJobs(){
    const availableJobs = this.jobService.getAvailableJobs();
    const filteredList = availableJobs.filter(job =>
      this.userLangs.includes(job.reqLang)
    )
    this.jobs = filteredList.filter(job =>
      this.userLangs.includes(job.sourceLang))
    console.log(this.jobs)
  }

  getEmployeeHistory(){
    this.jobs = this.jobService.getEmployeeJobHistory("5e9b21c62cd2752d18d6072d");
  }

  getJobsForReview(){
    this.jobsForReview = this.jobService.getJobsForReview();
  }
}
