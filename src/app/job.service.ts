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
    ipcRenderer.on('async-job-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateJob(modifiedJob: Job) {
    ipcRenderer.send('async-job-update', modifiedJob)
    ipcRenderer.on('async-job-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeJob(jobId: string) {
    const jobData = {
      id: jobId
    }
    ipcRenderer.send('async-job-remove', jobData)
    ipcRenderer.on('async-job-remove-reply', (event, arg) => {
      console.log(arg)
    })
  }

  getAllJobs() {
    ipcRenderer.send('async-job-get-all');
    ipcRenderer.on('async-job-get-all-reply',(event, arg) =>{
      this.jobList = [];
      console.log(arg)
      arg.forEach(element => {
        this.jobList.push(element);
      });
    })
    return this.jobList;
  }
}
