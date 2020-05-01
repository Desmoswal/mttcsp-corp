import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, PageService, SelectionService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { JobService } from '../../job.service';
import { Job } from '../../job.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-adminjobs',
  templateUrl: './adminjobs.component.html',
  styleUrls: ['./adminjobs.component.css'],
  providers: [ToolbarService]
})
export class AdminjobsComponent implements OnInit {

  @ViewChild('grid') grid: GridComponent;

  constructor(public jobService: JobService) { }

  public jobList: Job[] = [];
  public gridDataSource = this.jobList;
  public pageSettings: Object;
  public editSettings: Object;
  public toolbar: string[];

  ngOnInit(): void {
    this.jobList = this.jobService.getAllJobs();
    this.pageSettings = { pageSizes: true, pageCount: 15 };
    this.editSettings = { allowEditing: true, /*allowAdding: true,*/allowDeleting: true, showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Dialog' };
    this.toolbar = [/*'Add', */'Edit', 'Delete', 'Update', 'Cancel'];
  }

  onGridCreated(){
    this.grid.dataSource = this.jobList;
    this.grid.refresh();
  }

  getAllJobs()
  {
    this.jobList = this.jobService.getAllJobs();
    this.grid.dataSource = this.jobList;
  }

  actionBegin(args: any) :void {
    let gridInstance: any = (<any>document.getElementById('Grid')).ej2_instances[0];
    console.log(args)
    if (args.requestType === 'save'){
      const newData = args.data;
      if(isNullOrUndefined(newData._id)){
        const newJob: Job = {
          _id: '',
          clientId: newData.clientId,
          folder: newData.folder,
          price: newData.price,
          sourceLang: newData.sourceLang,
          reqLang: newData.reqLang,
          status: newData.status,
          employeeId: newData.employeeId,
          creationDate: newData.creationDate,
          startDate: newData.startDate,
          completionDate: newData.completionDate,
          reviewBy: newData.reviewBy
        }
        console.log("new job", newJob)
        this.jobService.createJob(newJob);
        this.grid.refresh();
      }
      else {
        const modifiedJob: Job = {
          _id: newData._id,
          clientId: newData.clientId,
          folder: newData.folder,
          price: newData.price,
          sourceLang: newData.sourceLang,
          reqLang: newData.reqLang,
          status: newData.status,
          employeeId: newData.employeeId,
          creationDate: newData.creationDate,
          startDate: newData.startDate,
          completionDate: newData.completionDate,
          reviewBy: newData.reviewBy
        }
        console.log("modified job", modifiedJob)
        this.jobService.updateJob(modifiedJob);
        this.grid.refresh();
      }

    }
    else if(args.requestType === 'delete'){
      this.jobService.removeJob(args.data[0]._id)
    }
  }
}
