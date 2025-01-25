import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeMedicalDetailsComponent } from './employee-medical-details/employee-medical-details.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeeChartsComponent } from './employee-charts/employee-charts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee-medical-details', component: EmployeeMedicalDetailsComponent, canActivate: [AuthGuard] },
  { path: 'employee-charts', component: EmployeeChartsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
