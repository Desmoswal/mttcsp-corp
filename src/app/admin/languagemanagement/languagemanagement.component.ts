import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from '../../language.model';
import { LanguageService } from '../../language.service';
import { isNullOrUndefined } from 'util';
import { GridComponent, PageService, SelectionService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-languagemanagement',
  templateUrl: './languagemanagement.component.html',
  styleUrls: ['./languagemanagement.component.css'],
  providers: [ToolbarService]
})
export class LanguagemanagementComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  constructor(public lanugageService: LanguageService) { }

  public languageList: Language[] = [];
  public gridDataSource = this.languageList;
  public pageSettings: Record<string, any>;
  public editSettings: Record<string, any>;
  public toolbar: string[];

  ngOnInit(): void {
    this.getAllLanguages();
    this.pageSettings = { pageSizes: true, pageCount: 15 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

  getAllLanguages() {
    this.lanugageService.getAllLanguages().then((languageList) => {
      this.languageList = languageList
    });
    console.log(this.languageList)
  }

  onGridCreated(){
    this.grid.dataSource = this.languageList;
    this.grid.refresh();
  }

  actionBegin(args: any): void {
    const gridInstance: any = (document.getElementById('Grid') as any).ej2_instances[0];
    console.log(args)
    if(args.requestType === 'save'){
      const inputLanguage: Language = {
        _id: args.data._id,
        name: args.data.name,
        short: args.data.short
      }
      if(isNullOrUndefined(args.previousData._id))
      {
        console.log(args.previousData.name)
        this.lanugageService.createLanguage(inputLanguage);
      }
      else{
        this.lanugageService.updateLanguage(inputLanguage);
        console.log('component:' + JSON.stringify(inputLanguage))
      }
    }
    else if(args.requestType === 'delete'){
      this.lanugageService.removeLanguage(args.data[0].name);
    }
  }
}
