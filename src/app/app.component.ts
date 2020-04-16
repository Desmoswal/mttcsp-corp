import { Component, ViewChild } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { SidebarComponent, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';

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

  @ViewChild('sidebar') sidebar: SidebarComponent;
    public onCreated(args: any) {
         this.sidebar.element.style.visibility = '';
    }

    closeClick(): void {
        this.sidebar.hide();
    };

    toggleClick():void{
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

  private select(args: MenuEventArgs): void {
    if(args.item.id == "toggleSidebar")
      this.toggleClick()
}
}
