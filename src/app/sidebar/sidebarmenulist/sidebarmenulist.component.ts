import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebarmenulist',
  templateUrl: './sidebarmenulist.component.html',
  styleUrls: ['./sidebarmenulist.component.css']
})
export class SidebarmenulistComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  currentUser: Employee
  userSub: Subscription

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userSub = this.authService.getCurrentUserListener().subscribe(user => {
      this.currentUser = user;
      this.setMenuItems()
    })
  }


  setMenuItems(){
    if(!isNullOrUndefined(this.currentUser) && this.currentUser.role != 'Admin'){
      this.dataSource = this.dataSource.filter(this.adminFilter)
    }
  }

  adminFilter(value) {
    return value.type != 'Admin'
  }

  public dataSource: { [key: string]: Object }[] = [
      { id: 'p_01', text: 'Admin Dashboard', icons: 'e-dashboard', type: 'Admin', link: 'admindashboard' },
      { id: 'p_02', text: 'Management', icons: 'e-management', type: 'Admin', link: 'adminmanagement'},
      //{ id: 'p_02', text: 'Jobs', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Admin', link: 'adminjobs' },
      //{ id: 'p_03', text: 'Employees', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Admin', link: 'employeemanagement' },
      { id: 'p_04', text: 'Statistics',  icons: 'e-statistics', type: 'Admin', link: 'adminstatistics' },
      { id: 'p_05', text: 'Dashboard', icons: 'e-dashboard', type: 'User', link: 'employeedashboard' },
      { id: 'p_06', text: 'Workspace', icons: 'e-workspace', type: 'User', link: 'workspace' },
      //{ id: 'p_07', text: 'Current Jobs', badge: '', icons: 'sent', type: 'User', link: 'currentjobs' },
      { id: 'p_08', text: 'Job History', icons: 'e-history', type: 'User', link: 'jobhistory' },
      { id: 'p_09', text: 'Chat', icons: 'e-chat', type: 'User', link: 'chat' },
      { id: 'p_10', text: 'Logout', icons: 'e-logout', type: 'User', link: 'logout' },
  ];

  // Map fields
  public fields: object = { groupBy: 'type' };

  public selected(args: any)
  {
    console.log("Navigate to: " + args.data.link)
    this.router.navigate([args.data.link])
  }
}
