import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../../job.model';
import { JobService } from '../../job.service';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobhistory',
  templateUrl: './jobhistory.component.html',
  styleUrls: ['./jobhistory.component.css']
})
export class JobhistoryComponent implements OnInit {

  constructor(public jobService: JobService, public authService: AuthService) { }

  @ViewChild('grid') grid: GridComponent;

  pageSettings: Record<string, any>;
  jobHistory: Job[] = []
  userSub: Subscription;
  currentUser: Employee

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userSub = this.authService.getCurrentUserListener().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)
    })

    this.pageSettings = { pageSizes: true, pageCount: 15 };
  }

  getJobHistory(){
    if(!isNullOrUndefined(this.currentUser)){
      this.jobService.getEmployeeJobHistory(this.currentUser._id).then(jobList => {
        this.jobHistory = jobList;
      })
    }
  }

  onGridCreated(){
    this.getJobHistory()
    this.grid.dataSource = this.jobHistory;
    this.grid.refresh();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
