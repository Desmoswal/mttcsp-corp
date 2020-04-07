import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  adminMenuItems = [
    {name: "Admin Dashboard", link: "home", icon:"fa-id-card"},
    {name: "Jobs", link: "jobs", icon: "fa-book"},
    {name: "Employees", link: "employees", icon: "dx-icon-group"},
    {name: "Statistics", link: "statistics", icon: "ion-md-stats"}
  ]
  commonMenuItems = [
    {name: "Dashboard", link: "dashboard", icon: "fa-address-card"},
    {name: "Available Jobs", link: "jobs", icon: "fa-book"},
    {name: "Current Jobs", link: "currentjobs", icon: "fa-book-open"},
    {name: "Job history", link: "history", icon: "fa-history"},
    {name: "Chat", link: "chat", icon: "ion-md-chatboxes"}
  ]
  isAdmin = true;

  isopen = false;
  toggle()
  {
    this.isopen = !this.isopen;
  }
}
