import { Component, ViewChild } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { SidebarComponent, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authListenerSubs: Subscription
  isUserAuthenticated = false
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    translate.setDefaultLang('en');
    translate.addLangs(['hu'])
    translate.use(translate.getBrowserLang());
    //translate.use('xx') //keep for showcase
    console.log(translate.getLangs())
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      console.log(isAuthenticated)
    })
  }

  @ViewChild('sidebar') sidebar: SidebarComponent;
    public onCreated(args: any) {
         this.sidebar.element.style.visibility = '';
         this.sidebar.hide();
    }

    closeClick(): void {
        this.sidebar.hide();
    }

    toggleClick(): void{
      this.sidebar.toggle();
    }

    public menuItems: MenuItemModel[] = [
      {
        text: 'sidebar', id: 'toggleSidebar'
      },
      {
          text: 'File',
          items: [
              { text: 'Open' },
              { text: 'Save' },
              { separator: true },
              { text: 'Exit' }
          ]
      },
      {
          text: 'Edit',
          items: [
              { text: 'Cut' },
              { text: 'Copy' },
              { text: 'Paste' }
          ]
      },
      {
          text: 'View',
          items: [
              { text: 'Toolbar' },
              { text: 'Sidebar' },
              { text: 'Full Screen' }
          ]
      },
      {
          text: 'Tools',
          items: [
              { text: 'Spelling & Grammar' },
              { text: 'Customize' },
              { text: 'Options' }
          ]
      },
      { text: 'Go'},
      { text: 'Help' }
  ];

  public select(args: MenuEventArgs): void {
    if(args.item.id == "toggleSidebar")
      this.toggleClick()
}
}
