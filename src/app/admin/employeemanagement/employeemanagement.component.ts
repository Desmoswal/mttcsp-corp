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
const { ipcRenderer } = require('electron')

@Component({
  selector: 'app-employeemanagement',
  templateUrl: './employeemanagement.component.html',
  styleUrls: ['./employeemanagement.component.css'],
  providers: [ ToolbarService ]
})
export class EmployeemanagementComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  @ViewChild('grid') grid: GridComponent;
  @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;

  public employeeList: Employee[] = [];
  public languageList: Language[] = [];
  public pageSettings: Record<string, any>;
  public editSettings: Record<string, any>;
  public toolbar: string[];

  public dropData: string[];

  ngOnInit(): void {
    this.getAllEmployees()
    this.pageSettings = { pageSizes: true, pageCount: 15 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.dropData = ['Order Placed', 'Processing', 'Delivered'];
  }

  onGridCreated(){
    this.getAllEmployees()
    this.grid.dataSource = this.employeeList
    this.grid.refresh();
  }

  getAllEmployees()
  {
    this.employeeService.getAllEmployees().then(employeeList => {
      this.employeeList = employeeList
    });
    //this.grid.refresh()
  }


  actionBegin(args: any): void {
    const gridInstance: any = (document.getElementById('Grid') as any).ej2_instances[0];
    console.log(args)
    if (args.requestType === 'save'){
      const newData = args.data;
      if(isNullOrUndefined(newData._id)){
        const newEmployee: Employee = {
          _id: '',
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
          password: newData.password,
          address: newData.address,
          city: newData.city,
          country: newData.country,
          zip: newData.zip,
          languages: ['hu'],
          profilePic: "",
          role: newData.role
        }
        console.log("new employee", newEmployee)
        this.employeeService.createEmployee(newEmployee);
        this.grid.refresh();
      }
      else {
        const modifiedEmployee: Employee = {
          _id: newData._id,
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
          password: newData.password,
          address: newData.address,
          city: newData.city,
          country: newData.country,
          zip: newData.zip,
          languages: ['hu'],
          profilePic: "",
          role: newData.role
        }
        console.log("modified employee", modifiedEmployee)
        this.employeeService.updateEmployee(modifiedEmployee);
        this.grid.refresh();
      }

    }
    else if(args.requestType === 'delete'){
      this.employeeService.removeEmployee(args.data[0]._id)
    }
  }
  updateRule(args: RuleChangeEventArgs): void {
    const predicate: Predicate = this.qryBldrObj.getPredicate(args.rule);
    const fltrDataSource: Employee[] = [];
    let dataManagerQuery: Query;
    if (isNullOrUndefined(predicate)) {
        dataManagerQuery = new Query().select(['_id', 'profilePic', 'firstName', 'lastName', 'email', 'country', 'role', 'languages']);
    } else {
        dataManagerQuery = new Query().select(['_id', 'profilePic', 'firstName', 'lastName', 'email', 'country', 'role', 'languages']).where(predicate);
    }
    new DataManager(this.employeeList).executeQuery(dataManagerQuery).then((e: ReturnOption) => {
            (e.result as Record<string,any>).forEach((data: Employee) => {
                fltrDataSource.push(data);
            });
        });
    this.grid.dataSource = fltrDataSource;
    this.grid.refresh();
  }

}
