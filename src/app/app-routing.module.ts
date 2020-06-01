import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminjobsComponent } from './admin/adminjobs/adminjobs.component';
import { AdminstatisticsComponent } from './admin/adminstatistics/adminstatistics.component';
import { EmployeemanagementComponent } from './admin/employeemanagement/employeemanagement.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { AvailablejobsComponent } from './employee/availablejobs/availablejobs.component';
import { JobhistoryComponent } from './employee/jobhistory/jobhistory.component';
import { EmployeedashboardComponent } from './employee/employeedashboard/employeedashboard.component';
import { WorkspaceComponent } from './employee/workspace/workspace.component';
import { ManagementComponent } from './admin/management/management.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]},
  { path: 'adminmanagement', component: ManagementComponent, canActivate: [AuthGuard]},
  { path: 'adminjobs', component: AdminjobsComponent, canActivate: [AuthGuard]},
  { path: 'adminstatistics', component: AdminstatisticsComponent, canActivate: [AuthGuard]},
  { path: 'employeemanagement', component: EmployeemanagementComponent, canActivate: [AuthGuard]},
  { path: 'employeedashboard', component: EmployeedashboardComponent, canActivate: [AuthGuard]},
  { path: 'availablejobs', component: AvailablejobsComponent, canActivate: [AuthGuard]},
  { path: 'jobhistory', component: JobhistoryComponent, canActivate: [AuthGuard]},
  { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
