import { Component, OnInit, ViewChild } from '@angular/core';
import { RuleModel , RuleChangeEventArgs} from '@syncfusion/ej2-querybuilder';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { employeeData } from './data-source';
import { DataManager, Query, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { GridComponent, PageService, SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-employeemanagement',
  templateUrl: './employeemanagement.component.html',
  styleUrls: ['./employeemanagement.component.css']
})
export class EmployeemanagementComponent implements OnInit {

  constructor() { }
  public data: Object[];
  public pageSettings: Object;
  public editSettings: Object;
  public toolbar: string[];
  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.pageSettings = { pageSizes: true, pageCount: 5 };
  }
  @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
  @ViewChild('grid') grid: GridComponent;

  dataSource = employeeData;
  gridDataSource = employeeData;
  //pageSettings: Object = { pageSize: 8, pageCount: 5 };

  importRules: RuleModel = {
      /*'condition': 'or',
      'rules': [{
          'label': 'EmployeeID',
          'field': 'EmployeeID',
          'type': 'string',
          'operator': 'endswith',
          'value': 'Laptop'
      }]*/
  };

  updateRule(args: RuleChangeEventArgs): void {
      const predicate: Predicate = this.qryBldrObj.getPredicate(args.rule);
      const fltrDataSource: Object[] = [];
      let dataManagerQuery: Query;
      if (isNullOrUndefined(predicate)) {
          dataManagerQuery = new Query().select(['EmployeeID', 'FirstName', 'LastName', 'Title', 'BirthDate', 'HireDate', 'Country']);
      } else {
          dataManagerQuery = new Query().select(['EmployeeID', 'LastName', 'Title', 'BirthDate', 'HireDate', 'Country'])
              .where(predicate);
      }
      new DataManager(employeeData)
          .executeQuery(dataManagerQuery)
          .then((e: ReturnOption) => {
              (<Object[]>e.result).forEach((data: Object) => {
                  fltrDataSource.push(data);
              });
          });
      this.gridDataSource = fltrDataSource;
      this.grid.refresh();
  }
  onGridCreated(): void {
      this.updateRule({rule: this.qryBldrObj.getValidRules(this.qryBldrObj.rule)})
  }

  actionBegin(args: any) :void {
    let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
    if (args.requestType === 'save') {
        if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
        } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
        }
    }
}
}
