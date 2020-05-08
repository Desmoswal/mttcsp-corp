import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { HomeComponent } from './home/home.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminjobsComponent } from './admin/adminjobs/adminjobs.component';
import { AdminstatisticsComponent } from './admin/adminstatistics/adminstatistics.component';
import { EmployeemanagementComponent } from './admin/employeemanagement/employeemanagement.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatComponent } from './chat/chat.component';
import { AvailablejobsComponent } from './employee/availablejobs/availablejobs.component';
import { JobhistoryComponent } from './employee/jobhistory/jobhistory.component';
import { EmployeedashboardComponent } from './employee/employeedashboard/employeedashboard.component';
import { CurrentjobsComponent } from './employee/currentjobs/currentjobs.component';
import { WorkspaceComponent } from './employee/workspace/workspace.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]},
  { path: 'adminjobs', component: AdminjobsComponent},
  { path: 'adminstatistics', component: AdminstatisticsComponent},
  { path: 'employeemanagement', component: EmployeemanagementComponent},
  { path: 'employeedashboard', component: EmployeedashboardComponent},
  { path: 'availablejobs', component: AvailablejobsComponent},
  { path: 'currentjobs', component: CurrentjobsComponent},
  { path: 'jobhistory', component: JobhistoryComponent},
  { path: 'workspace', component: WorkspaceComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
