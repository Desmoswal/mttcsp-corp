import { Injectable } from '@angular/core';
import { Job } from './job.model';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }
  jobList: Job[] = []

  createJob(newJob: Job){
    ipcRenderer.send('async-job-create', newJob)
    ipcRenderer.once('async-job-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateJob(modifiedJob: Job) {
    ipcRenderer.send('async-job-update', modifiedJob)
    ipcRenderer.once('async-job-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeJob(jobId: string) {
    const jobData = {
      id: jobId
    }
    ipcRenderer.send('async-job-remove', jobData)
    ipcRenderer.once('async-job-remove-reply', (event, arg) => {
      console.log(arg)
    })
  }

  getAllJobs() {
    ipcRenderer.send('async-job-get-all');
    ipcRenderer.once('async-job-get-all-reply',(event, arg) =>{
      this.jobList = [];
      console.log(arg)
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }

  getJobByEmployee(employeeId: string){
    const employee = {
      employeeId: employeeId
    }
    ipcRenderer.send('async-job-get-by-employee', employee);
    ipcRenderer.once('async-job-get-by-employee-reply', (event, arg)=> {
      this.jobList = [];
      console.log(arg);
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }

  getAvailableJobs(){
    ipcRenderer.send('async-job-get-available');
    ipcRenderer.once('async-job-get-available-reply', (event, arg) => {
      this.jobList = [];
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }

  getEmployeeJobHistory(employeeId: string){
    const employee = {
      employeeId: employeeId
    }
    ipcRenderer.send('async-job-get-employee-history', employee);
    ipcRenderer.once('async-job-get-employee-history-reply', (event,arg)=> {
      this.jobList = [];
      console.log(arg);
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }

  getJobsForReview(){
    ipcRenderer.send('async-job-get-review');
    ipcRenderer.once('async-job-get-review-reply', (event,arg)=>{
      this.jobList = [];
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }
}
