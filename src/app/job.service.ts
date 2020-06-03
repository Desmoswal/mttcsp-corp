import { Injectable } from '@angular/core';
import { Job } from './job.model';
import { ipcRenderer } from 'electron';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }
  jobList: Job[] = []
  workspaceJob: Job
  isReview = false;

  getWorkspaceJob(){
    return this.workspaceJob;
  }

  setWorkspaceJob(job: Job){
    this.workspaceJob = job;
  }

  getIsReview(){
    return this.isReview;
  }

  setIsReview(isReview: boolean){
    this.isReview = isReview;
  }

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
    const promise = new Promise<Job[]>((resolve,reject)=> {
      ipcRenderer.send('async-job-get-all');
      ipcRenderer.once('async-job-get-all-reply',(event, arg) =>{
        this.jobList = [];
        console.log(arg)
        arg.forEach(element => {
          this.jobList.push(element);
        });
        resolve(this.jobList)
      })
    })
    return promise;
  }

  getJobsByEmployee(employeeId: string){
    const employee = {
      employeeId: employeeId
    }
    const promise = new Promise<Job[]>((resolve,reject)=> {
      ipcRenderer.send('async-job-get-by-employee', employee);
      ipcRenderer.once('async-job-get-by-employee-reply', (event, arg)=> {
        this.jobList = [];
        console.log(arg);
        arg.forEach(element => {
          this.jobList.push(element);
        });
        resolve(this.jobList)
      })
    })
    return promise;
  }

  getAvailableJobs(){
    const promise = new Promise<Job[]>((resolve,reject)=> {
      ipcRenderer.send('async-job-get-available');
      ipcRenderer.once('async-job-get-available-reply', (event, arg) => {
        this.jobList = [];
        arg.forEach(element => {
          this.jobList.push(element);
        });
        resolve(this.jobList)
      })
    })
    return promise;
  }

  getEmployeeJobHistory(employeeId: string){
    const employee = {
      employeeId: employeeId
    }
    const promise = new Promise<Job[]>((resolve, reject)=> {
      ipcRenderer.send('async-job-get-employee-history', employee);
      ipcRenderer.once('async-job-get-employee-history-reply', (event,arg)=> {
        this.jobList = [];
        console.log(arg);
        arg.forEach(element => {
          this.jobList.push(element);
        });
        resolve(this.jobList)
      })
    })
    return promise;
  }

  getJobsForReview(){
    const promise = new Promise<Job[]>((resolve,reject)=> {
      ipcRenderer.send('async-job-get-review');
      ipcRenderer.once('async-job-get-review-reply', (event,arg)=>{
        this.jobList = [];
        arg.forEach(element => {
          this.jobList.push(element);
        });
        resolve(this.jobList)
      })
    })
    return promise;
  }

  createJobDirectory(jobId: string){
    const jobInfo = {
      jobId: jobId
    }
    ipcRenderer.send('async-job-create-directory', jobInfo);
    ipcRenderer.once('async-job-create-directory-reply', (event,arg)=> {
      console.log(arg)
    })
  }

  getJobFiles(jobFolder: string){
    const jobInfo = {
      jobFolder: jobFolder
    }
    ipcRenderer.send('async-job-get-files', jobInfo);
    ipcRenderer.once('async-job-get-files-reply', (event,arg)=> {
      console.log(arg)
    })
  }

  deleteJobDirectory(jobId: string){
    const jobInfo = {
      jobId: jobId
    }
    console.log('JOB INFO ID: '+jobInfo)
    ipcRenderer.send('async-job-delete-files', jobInfo);
    ipcRenderer.once('async-job-delete-files-reply', (event,arg)=> {
      console.log(arg)
    })
  }

  uploadJobFiles(folder: string){
    const data = {
      folder: folder
    }

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.send('async-job-upload-file', data)
      ipcRenderer.once('async-job-upload-file-reply', (event,arg)=> {
        console.log(arg)
      })
      resolve()
    })
    return promise
  }
}
