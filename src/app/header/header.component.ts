import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuItems = [
    {name: "Profile", icon: "fas fa-address-card"},
    {name: "Logout", icon: "fas fa-sign-out-alt"}
]

  dosomething(){
    console.log("did something")
  }
}
