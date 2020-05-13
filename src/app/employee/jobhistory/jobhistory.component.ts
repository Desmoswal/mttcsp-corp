import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../../job.model';
import { JobService } from '../../job.service';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-jobhistory',
  templateUrl: './jobhistory.component.html',
  styleUrls: ['./jobhistory.component.css']
})
export class JobhistoryComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService) { }

  @ViewChild('grid') grid: GridComponent;

  pageSettings: Record<string, any>;

  ngOnInit(): void {
    this.getCurrentEmployee();
    this.getJobHistory();
    this.pageSettings = { pageSizes: true, pageCount: 15 };
  }

  jobHistory: Job[] = []
  employee: Employee

  getJobHistory(){
    if(!isNullOrUndefined(this.employee)){
      this.jobService.getEmployeeJobHistory(this.employee._id).then(jobList => {
        this.jobHistory = jobList;
      })
    }
  }

  getCurrentEmployee(){
    this.employee = this.authService.getCurrentUser();
  }

  onGridCreated(){
    this.getJobHistory()
    this.grid.dataSource = this.jobHistory;
    this.grid.refresh();
  }
}
