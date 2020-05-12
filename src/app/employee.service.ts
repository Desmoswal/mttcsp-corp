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
    ipcRenderer.once('async-employee-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateEmployee(modifiedEmployee: Employee) {
    ipcRenderer.send('async-employee-update', modifiedEmployee)
    ipcRenderer.once('async-employee-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeEmployee(employeeId: string) {
    const employeeData = {
      id: employeeId
    }
    ipcRenderer.send('async-employee-remove', employeeData)
    ipcRenderer.once('async-employee-remove-reply', (event, arg) => {
      console.log(arg)
    })
  }

  getAllEmployees() {
    const promise = new Promise<Employee[]>((resolve, reject)=> {

      ipcRenderer.send('async-employee-get-all');
      ipcRenderer.once('async-employee-get-all-reply',(event, arg) =>{
        this.employeeList = [];
        console.log(arg)
        arg.forEach(element => {
          this.employeeList.push(element);
        });
        resolve(this.employeeList)
      })
    })
    return promise;
  }

  getEmployeeById(employeeId: string){
    const employeeData = {
      id: employeeId
    }
    const promise = new Promise<Employee[]>((resolve, reject)=> {
      ipcRenderer.send('async-employee-get-by-id', employeeData)
      ipcRenderer.once('async-employee-get-by-id-reply', (event,arg)=> {
        this.employeeList = [];
        arg.forEach(element => {
          this.employeeList.push(element)
        });
        resolve(this.employeeList)
      })
    })
    return promise;
  }
}
