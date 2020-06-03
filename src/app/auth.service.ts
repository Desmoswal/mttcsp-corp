import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Employee } from './employee.model';
import { AuthData } from './auth-data.model';
import { ipcRenderer } from 'electron';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from "jwt-decode";
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;
  private userId: string;
  private chatAuthToken: string;

  constructor(private router: Router, private http: HttpClient) {}

  currentUser:Employee
  currentUserListener = new Subject<Employee>()


  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getCurrentUserListener(){
    return this.currentUserListener.asObservable();
  }

  getCurrentUser(){
    return this.currentUser;
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string}>("http://localhost:3000/login",authData)
      .subscribe(response => {
        this.token = response.token;
        console.log(this.token)
        if (this.token) {
          const decodedtoken = jwtDecode(this.token);
          const now = new Date();
          const expiration = new Date(decodedtoken.exp)

          const expiresInDuration = expiration.getTime() - now.getTime();

          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = decodedtoken.sub;
          this.authStatusListener.next(true);
          const expirationDate = new Date(decodedtoken.exp);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(["/employeedashboard"]);
          this.getUserProfile();
          this.chatLogin(authData.email, authData.password)
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  chatLogin(username: string, password: string){
    const authData: AuthData = { email: username, password: password}
    this.http.post<any>("http://192.168.0.200:3000/api/v1/login", authData).subscribe(response => {
      this.chatAuthToken = response.data.authToken;
    })
  }

  chatLogout(){
    this.http.post("http://192.168.0.200:3000/api/v1/logout", this.chatAuthToken).subscribe(response => {
      console.log(response)
    })
  }

  getUserProfile(){
    this.currentUser = new Employee;
    this.http.get<{user: Employee}>("http://localhost:3000/profile").subscribe(response => {
      this.currentUser._id = response.user._id;
      this.currentUser.firstName = response.user.firstName;
      this.currentUser.lastName = response.user.lastName;
      this.currentUser.email = response.user.email;
      this.currentUser.address = response.user.address;
      this.currentUser.city = response.user.city;
      this.currentUser.country = response.user.country;
      this.currentUser.zip = response.user.zip;
      this.currentUser.profilePic = response.user.profilePic;
      this.currentUser.languages = response.user.languages;
      this.currentUser.role = response.user.role
      this.currentUserListener.next(response.user)
    });
    return this.currentUser;
  }

  createNewChatUser(employeeData: Employee){
    const chatData = { email: employeeData.email, name: employeeData.firstName + employeeData.lastName, password: employeeData.password, username: employeeData.firstName+"."+employeeData.lastName }
    this.http.post("http://192.168.0.200:3000/api/v1/users.create", chatData).subscribe(response => {
      console.log(response)
    });
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer: " + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  logout() {
    this.chatLogout();
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(["/"]);
  }

}
