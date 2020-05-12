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

  setMenuItems(){
    if(this.currentUser.role == 'Admin'){
      this.dataSource = this.dataSource.filter(this.adminFilter)
    }
  }

  public dataSource: { [key: string]: Object }[] = [
      { id: 'p_01', text: 'Admin Dashboard', icons: 'primary', type: 'Admin', link: 'admindashboard' },
      { id: 'p_02', text: 'Management', type: 'Admin', link: 'adminmanagement'},
      //{ id: 'p_02', text: 'Jobs', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Admin', link: 'adminjobs' },
      //{ id: 'p_03', text: 'Employees', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Admin', link: 'employeemanagement' },
      { id: 'p_04', text: 'Statistics',  icons: 'updates', type: 'Admin', link: 'adminstatistics' },
      { id: 'p_05', text: 'Dashboard', icons: 'starred', type: 'User', link: 'employeedashboard' },
      { id: 'p_06', text: 'Workspace', icons: 'important', type: 'User', link: 'workspace' },
      //{ id: 'p_07', text: 'Current Jobs', badge: '', icons: 'sent', type: 'User', link: 'currentjobs' },
      { id: 'p_08', text: 'Job History', icons: 'outbox', type: 'User', link: 'jobhistory' },
      { id: 'p_09', text: 'Chat', icons: 'draft', type: 'User', link: 'chat' },
      { id: 'p_10', text: 'Logout', icons: 'draft', type: 'User', link: 'logout' },
  ];

  // Map fields
  public fields: object = { groupBy: 'type' };

  public selected(args: any)
  {
    console.log("Navigate to: " + args.data.link)
    this.router.navigate([args.data.link])
  }
}
