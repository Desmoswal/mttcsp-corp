import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorComponent } from '@syncfusion/ej2-angular-documenteditor';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';
import { Employee } from '../../employee.model';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  providers: [ToolbarService]
})
export class WorkspaceComponent implements OnInit {

  constructor(public jobService: JobService, public router: Router, public authService: AuthService) { }

  isReview: boolean;

  ngOnInit(): void {
    this.activeJob = this.jobService.getWorkspaceJob();
    this.isReview = this.jobService.getIsReview();
    this.createDirectory();
    this.getFiles();
    this.currentUser = this.authService.getCurrentUser()
  }
  activeJob: Job;
  currentUser: Employee;

  /*public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    public document = 'PDF_Succinctly.pdf';*/
  public service ='https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document = ''

  createDirectory(){
    if(this.activeJob)
      this.jobService.createJobDirectory(this.activeJob.folder)
  }

  deleteDirectory(){
    this.jobService.deleteJobDirectory(this.activeJob.folder)
  }

  getFiles(){
    if(this.activeJob)
      this.jobService.getJobFiles(this.activeJob.folder)
  }

  doneJob(){
    this.jobService.uploadJobFiles(this.activeJob.folder).then(() => {
      if(!this.isReview){
        const modifiedJob: Job = {
          _id: this.activeJob._id,
          clientId: this.activeJob.clientId,
          folder: this.activeJob.folder,
          price: this.activeJob.price,
          sourceLang: this.activeJob.sourceLang,
          reqLang: this.activeJob.reqLang,
          status: 'REVIEW',
          employeeId: this.authService.getCurrentUser()._id,
          creationDate: this.activeJob.creationDate,
          startDate: this.getFormattedDate().toString(),
          completionDate: this.activeJob.completionDate,
          reviewBy: this.activeJob.reviewBy
        }
        this.jobService.updateJob(modifiedJob);
      }
      else {
        const modifiedJob: Job = {
          _id: this.activeJob._id,
          clientId: this.activeJob.clientId,
          folder: this.activeJob.folder,
          price: this.activeJob.price,
          sourceLang: this.activeJob.sourceLang,
          reqLang: this.activeJob.reqLang,
          status: 'DONE',
          employeeId: this.activeJob.employeeId,
          creationDate: this.activeJob.creationDate,
          startDate: this.activeJob.startDate,
          completionDate: this.getFormattedDate(),
          reviewBy: this.currentUser._id.toString()
        }
        this.jobService.updateJob(modifiedJob);
      }
      this.jobService.deleteJobDirectory(this.activeJob._id)
      this.router.navigate(['/employeedashboard']);
    }).catch(err => {
      console.log(err.message)
    })
  }

  getFormattedDate(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const formattedDate = pipe.transform(now, 'dd-MM-yyyy')
    return formattedDate;
   }
}
