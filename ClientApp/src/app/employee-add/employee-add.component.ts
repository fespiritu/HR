import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from './../employee';
import { IEmployeeApi } from './../models/iemployee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm!: FormGroup;
  registerError: string;
  isEditMode!: boolean;
  title!: string;
  selectedId!: number;
  //modalRef!: BsModalRef;
  isMessageModalShown!: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private route: ActivatedRoute
             // private modalService: BsModalService
             ) {
    this.registerError = '';
  }

  ngOnInit(): void {
    this.isEditMode = false;
    this.selectedId = 0;
    this.title = 'Add Employee';
    this.isMessageModalShown = false;
    this.employeeForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName:  new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      address1:  new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      address2:  new FormControl(null),
      city:  new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      state:  new FormControl(null, [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      zipCode:  new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      role:  new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      department:  new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      skillSets:  new FormControl(null, [Validators.maxLength(1000)]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      dateOfJoining: new FormControl(null, [Validators.required]),
      // dateOfJoining:  [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      isActive:  new FormControl(true)
    });

    this.route.paramMap.subscribe(params => {
      const empId = params.get('id');
      if (empId) {
        const id = Number(empId);
        this.isEditMode = id > 0;
        if (this.isEditMode) {
          this.selectedId = id;
          this.title = 'Edit Employee';
        } else {
          this.selectedId = 0;
        }
        this.getEmployee(id);
      }
    });
  }

  get firstName(): any { return this.employeeForm.get('firstName'); }
  get lastName(): any { return this.employeeForm.get('lastName'); }
  get address1(): any { return this.employeeForm.get('address1'); }
  get address2(): any { return this.employeeForm.get('address2'); }
  get city(): any { return this.employeeForm.get('city'); }
  get state(): any { return this.employeeForm.get('state'); }
  get zipCode(): any { return this.employeeForm.get('zipCode'); }
  get role(): any { return this.employeeForm.get('role'); }
  get department(): any { return this.employeeForm.get('department'); }
  get skillSets(): any { return this.employeeForm.get('skillSets'); }

  get dateOfBirth(): any { return this.employeeForm.get('dateOfBirth'); }
  get dateOfJoining(): any { return this.employeeForm.get('dateOfJoining'); }
  get isActive(): any { return this.employeeForm.get('isActive'); }

  onSubmitClick(): void {
    console.log('submit this.employeeForm: ', this.employeeForm);
    if (this.employeeForm.valid) {
      console.log('this.employeeForm : ', this.employeeForm );
      const employee = this.employeeForm.value as Employee;
      if (this.isEditMode) {
        // Edit mode
        employee.id = this.selectedId;
        this.putEmployee(employee);
      } else {
        // Add mode
        this.postEmployee(employee);
      }
    } else {
      console.log('submit not valid');
      this.validateAllFormFields(this.employeeForm);
    }
  }

  putEmployee(employee: Employee): void {
    const message = this.employeeService.putEmployee(employee).subscribe(
      (response: any) => {
        console.log('submit response: ', response);
        this.router.navigate(['employees']);
      },
      (err: any) => {
        const msg = `Error in saving record. (Status ${err.status}): ${err.statusText}`;
        console.log('putEmployee err: ', err);
        alert(msg);
        // this.router.navigateByUrl('employees');
      });
  }

  postEmployee(employee: Employee): void {
    const message = this.employeeService.postEmployee(employee).subscribe(
      (response: any) => {
        console.log('submit response: ', response);
        this.router.navigate(['employees']);
      },
      (err: any) => {
        const msg = `Error in saving record. (Status ${err.status}): ${err.statusText}`;
        console.log('postEmployee err: ', err);
        alert(msg);
        // this.router.navigateByUrl('employees');
      });
  }

  // Go thru each field and activate its validation(touched)
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployeeApi) => this.editEmployee(employee),
      (err: any) => {
        const msg = `Error in getting records. (Status ${err.status}): ${err.statusText}`;
        console.log('Get Employee err: ', err);
        alert(msg);
        this.router.navigateByUrl('employees');
      }
    );
  }

  // When setting dates, use this format: 'yyyy-MM-dd'
  editEmployee(emp: IEmployeeApi): void {
    console.log('editEmployee: ', emp);
    this.employeeForm.patchValue({
      firstName: emp.firstName,
      lastName:  emp.lastName,
      address1:  emp.address1,
      address2:  emp.address2,
      city: emp.city,
      state: emp.state,
      zipCode: emp.zipCode,
      role: emp.role,
      department: emp.department,
      skillSets: emp.skillSets,
      dateOfBirth: formatDate(emp.dateOfBirth, 'yyyy-MM-dd', 'en'),
      dateOfJoining: formatDate(emp.dateOfJoining, 'yyyy-MM-dd', 'en'),
      isActive: emp.isActive
    });

    console.log('editEmployee this.employeeForm: ', this.employeeForm.value);
  }
  cancel(): void {
   this.router.navigateByUrl('employees');
  }

  openModal(template: TemplateRef<any>): void {
   // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
   // this.modalRef.hide();
    console.log('Saving...');
    this.onSubmitClick();
  }

  decline(): void {
    this.isMessageModalShown = false;
 //   this.modalRef.hide();
  }
}

