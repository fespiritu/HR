import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './../employee-add/employee-add.component';
@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    EmployeeComponent
  ]
})
export class EmployeeModule { }
