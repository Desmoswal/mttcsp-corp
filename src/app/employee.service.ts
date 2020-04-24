import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  employeeList: Employee[] = [];

  createEmployee(newEmployee: Employee){
    ipcRenderer.send('async-employee-create', newEmployee)
    ipcRenderer.on('async-employee-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateEmployee(modifiedEmployee: Employee) {
    ipcRenderer.send('async-employee-update', modifiedEmployee)
    ipcRenderer.on('async-employee-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeEmployee(employeeId: string) {
    const employeeData = {
      id: employeeId
    }
    ipcRenderer.send('async-employee-remove', employeeData)
    ipcRenderer.on('async-employee-remove-reply', (event, arg) => {
      console.log(arg)
    })
  }

  getAllEmployees() {
    ipcRenderer.send('async-employee-get-all');
    ipcRenderer.on('async-employee-get-all-reply',(event, arg) =>{
      this.employeeList = [];
      console.log(arg)
      arg.forEach(element => {
        this.employeeList.push(element);
      });
    })
    return this.employeeList;
  }
}
