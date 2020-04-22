import { Component, OnInit, ViewChild } from '@angular/core';
import { RuleModel , RuleChangeEventArgs} from '@syncfusion/ej2-querybuilder';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
//import { employeeData } from './data-source';
import { DataManager, Query, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { GridComponent, PageService, SelectionService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';
import { Language } from '../../language.model';
import { LanguageService } from '../../language.service';
const { ipcRenderer } = require('electron')

@Component({
  selector: 'app-employeemanagement',
  templateUrl: './employeemanagement.component.html',
  styleUrls: ['./employeemanagement.component.css'],
  providers: [ ToolbarService ]
})
export class EmployeemanagementComponent implements OnInit {

  constructor(public employeeService: EmployeeService, public languageService: LanguageService) { }

  @ViewChild('grid') grid: GridComponent;
  @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;

  public employeeList: Employee[] = [];
  public languageList: Language[] = [];
  public pageSettings: Object;
  public editSettings: Object;
  public toolbar: string[];
  public gridDataSource = this.employeeList;

  public dropData: string[];

  ngOnInit(): void {
    this.employeeList = this.employeeService.getAllEmployees();
    this.pageSettings = { pageSizes: true, pageCount: 15 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.dropData = ['Order Placed', 'Processing', 'Delivered'];
  }

  onGridCreated(){
    this.grid.dataSource = this.employeeList;
    this.grid.refresh();
  }
  getAllEmployees()
  {
    this.employeeList = this.employeeService.getAllEmployees();
    this.grid.dataSource = this.employeeList;

    this.languageList = this.languageService.getAllLanguages();
    console.log(this.languageList)
  }


  actionBegin(args: any) :void {
    let gridInstance: any = (<any>document.getElementById('Grid')).ej2_instances[0];
    if (args.requestType === 'save'){
    console.log(args)
        if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
        } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
        }
    }
  }


  /*
  actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.orderForm = this.createFormGroup(args.rowData);
        }
        if (args.requestType === 'save') {
            if (this.orderForm.valid) {
                args.data = this.orderForm.value;
            } else {
                args.cancel = true;
            }
        }
    }

    actionComplete(args: DialogEditEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
            }
        }
    }
    */
/*
   actionComplete(args) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        const dialog = args.dialog;
        const CustomerID = 'CustomerID';
        // change the header of the dialog
        dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[CustomerID] : 'New Customer';
    }
  }
*/
  updateRule(args: RuleChangeEventArgs): void {
    const predicate: Predicate = this.qryBldrObj.getPredicate(args.rule);
    const fltrDataSource: Employee[] = [];
    let dataManagerQuery: Query;
    if (isNullOrUndefined(predicate)) {
        dataManagerQuery = new Query().select(['_id', 'firstName', 'lastName', 'email', 'country', 'role', 'languages']);
    } else {
        dataManagerQuery = new Query().select(['_id', 'firstName', 'lastName', 'email', 'country', 'role', 'languages']).where(predicate);
    }
    new DataManager(this.employeeList).executeQuery(dataManagerQuery).then((e: ReturnOption) => {
            (<Object[]>e.result).forEach((data: Employee) => {
                fltrDataSource.push(data);
            });
        });
    this.gridDataSource = fltrDataSource;
    this.grid.refresh();
  }

}
