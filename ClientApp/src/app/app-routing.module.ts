import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'addEmployee', component: EmployeeAddComponent },
  { path: 'editEmployee/:id', component: EmployeeAddComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
