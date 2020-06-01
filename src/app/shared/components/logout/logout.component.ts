import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  }

  public logout(){
    this.authService.logout();
  }

  public animationSettings: Record<string, any> = { effect: 'Zoom', duration: 400, delay: 0 };
  public buttons: Record<string, any> = [
    {
        'click': this.logout.bind(this),
        buttonModel:{ content:'Yes', isPrimary: true}
    },
    {
        'click': this.hideDialog.bind(this),buttonModel:{ content:'Cancel' }
    }
];
}
