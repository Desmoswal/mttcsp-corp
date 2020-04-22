import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { HomeComponent } from './home/home.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminjobsComponent } from './admin/adminjobs/adminjobs.component';
import { AdminstatisticsComponent } from './admin/adminstatistics/adminstatistics.component';
import { EmployeemanagementComponent } from './admin/employeemanagement/employeemanagement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admindashboard', component: AdmindashboardComponent},
  { path: 'adminjobs', component: AdminjobsComponent},
  { path: 'adminstatistics', component: AdminstatisticsComponent},
  { path: 'employeemanagement', component: EmployeemanagementComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
