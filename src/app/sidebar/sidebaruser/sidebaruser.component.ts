import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Employee } from '../../employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebaruser',
  templateUrl: './sidebaruser.component.html',
  styleUrls: ['./sidebaruser.component.css']
})
export class SidebaruserComponent implements OnInit {

  constructor(public authService: AuthService) { }

  currentUser: Employee
  initials: string
  userSub: Subscription
  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    this.currentUser = this.authService.getCurrentUser();
    this.userSub = this.authService.getCurrentUserListener().subscribe(user => {
      this.currentUser = user;
      this.initials = this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0)
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
