import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  employeeList: Employee[] = [];

  createEmployee(){
    const employeeData = {
      firstName: 'asd',
      lastName: 'qwe',
      email: 'email13311@email.com',
      password: 'pass',
      address: 'address',
      city: 'city',
      country: 'country',
      zip: '11111',
      languages: ['en','hu', 'dk'],
      role: 'employee'
    }

    ipcRenderer.send('async-employee-create', employeeData)
    ipcRenderer.on('async-employee-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateEmployee() {
    const employeeData = {
      id: '5e98719e35c3f43fd0b0105e',
      firstName: 'firstname',
      lastName: 'lastname',
      email: 'email@email1.com',
      password: 'pass',
      address: 'address',
      city: 'city',
      country: 'country',
      zip: '11111',
      languages: ['en','hu', 'dk'],
      role: 'admin'
    }
    ipcRenderer.send('async-employee-update', employeeData)
    ipcRenderer.on('async-employee-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeEmployee() {
    const employeeData = {
      id: '5e98719e35c3f43fd0b0105e'
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
    //console.log(this.employeeList)
    return this.employeeList;
  }
}
