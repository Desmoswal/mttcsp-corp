import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebarmenulist',
  templateUrl: './sidebarmenulist.component.html',
  styleUrls: ['./sidebarmenulist.component.css']
})
export class SidebarmenulistComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  currentUser: Employee
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.setMenuItems()
  }

  adminFilter(value) {
    return value.type != 'Admin'
  }

  public badge = {
    Dashboard: 3,
    Jobs: 27,
    AvailableJobs: 7,
    Updates: 13,
    Important: 2,
    Drafts: 7
}

setMenuItems(){
  if(this.currentUser.role == 'Admin'){
    this.dataSource = this.dataSource.filter(this.adminFilter)
  }
}
// Datasource for listview, badge field is the class data for Badges
public dataSource: { [key: string]: Object }[] = [
    { id: 'p_01', text: 'Admin Dashboard', badge: 'e-badge e-badge-primary', icons: 'primary', type: 'Admin', link: 'admindashboard' },
    { id: 'p_02', text: 'Jobs', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Admin', link: 'adminjobs' },
    { id: 'p_03', text: 'Employees', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Admin', link: 'employeemanagement' },
    { id: 'p_04', text: 'Statistics', badge: 'e-badge e-badge-info', icons: 'updates', type: 'Admin', link: 'adminstatistics' },
    { id: 'p_05', text: 'Dashboard', badge: '', icons: 'starred', type: 'User', link: 'employeedashboard' },
    { id: 'p_06', text: 'Workspace', badge: 'e-badge e-badge-danger', icons: 'important', type: 'User', link: 'workspace' },
    //{ id: 'p_07', text: 'Current Jobs', badge: '', icons: 'sent', type: 'User', link: 'currentjobs' },
    { id: 'p_08', text: 'Job History', badge: '', icons: 'outbox', type: 'User', link: 'jobhistory' },
    { id: 'p_09', text: 'Chat', badge: 'e-badge e-badge-warning', icons: 'draft', type: 'User', link: 'chat' },
    { id: 'p_10', text: 'Logout', badge: 'e-badge e-badge-warning', icons: 'draft', type: 'User', link: 'logout' },
];

// Map fields
public fields: object = { groupBy: 'type' };

public onClick() {
    let badgeKeys = Object.keys(this.badge);
    for (let badge of badgeKeys) {
        this.badge[badge]++;
    }
  }

  public selected(args: any)
  {
    console.log("Navigate to: " + args.data.link)
    this.router.navigate([args.data.link])
  }
}
