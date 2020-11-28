import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { IEmployee } from '../models/iemployee';
import { EmployeeService } from './employee.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  columnDefs = [
    // { headerName: '', filter: true, button: true, width: '100px' },
    { headerName: 'ID', field: 'ID', sortable: true, filter: true, width: '100px' },
    { headerName: 'Name', field: 'Name', sortable: true, filter: true },
    { headerName: 'Address', field: 'Address', sortable: true, filter: true, resizable: true },
    { headerName: 'Role', field: 'Role', sortable: true, filter: true, resizable: true  },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, resizable: true  },
    { headerName: 'SkillSets', field: 'SkillSets', sortable: true, filter: true, resizable: true  },
    { headerName: 'Date of Birth', field: 'DateOfBirth', sortable: true, filter: true, width: '125px'  },
    { headerName: 'Date of Joining', field: 'DateOfJoining', sortable: true, filter: true, width: '125px'  },
    { headerName: 'Is Active', field: 'IsActiveDisplay', sortable: true, filter: true, width: '100px' }
  ];

  rowData: IEmployee[];
  isRowSelected!: boolean;
  selectedId!: number;
  // modalRef!: BsModalRef;
  informMessage!: string;
  // isMessageModalShown: boolean;

  constructor(private employeeService: EmployeeService
              // private modalService: BsModalService
              ) {

  }

  ngOnInit(): void {
    this.selectedId = 0;
    this.informMessage = '';
    // this.isMessageModalShown = false;
    this.employeeService.getEmployees().subscribe(response => {
      console.log('response: ', response);
      this.isRowSelected = false;
      // set delay to see loading icon
      // setTimeout(() => {
      //   this.rowData = response;
      // }, 3000);
      this.rowData = response.map(r => ({
        ID: r.id,
        Name: r.firstName + ' ' + r.lastName,
        Address: this.createAddress(r),
        Role: r.role,
        Department: r.department,
        SkillSets: r.skillSets,
        DateOfBirth: formatDate(r.dateOfBirth, 'MM/dd/yyyy', 'en_US'),
        DateOfJoining: formatDate(r.dateOfJoining, 'MM/dd/yyyy', 'en_US'),
        IsActiveDisplay: r.isActive ? 'Yes' : 'No'
      }));
      console.log('grid this.employees: ', this.rowData);
    }, error => {
      console.log('error: ', error);
    });
  }

  createAddress(row: any): string {
    let address = row.address1;
    if (row.address2) {
      address += ', ' + row.address2;
    }
    address += ', ';
    address += row.city + ', ' + row.state + ' ' + row.zipCode;

    return address;
  }

  getSelectedId(selectedId: string): number {
    console.log('getSelectedId selectedId: ', selectedId);
    const id = selectedId ? Number(selectedId) : 0;
    return id;
  }
  onSelectionChanged(): void {
    const selectedId = this.getSelectedRows();
    this.selectedId = this.getSelectedId(selectedId);
    this.isRowSelected = this.selectedId > 0;
  }

  onRowDoubleClicked(): void {
    this.editItem();
  }

  // In general we are selecting 1 row at a time. In the future, just enable multiple selection
  // in the grid these methods pass back a csv list of selected ids
  getSelectedRows(): string {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    // console.log('freddie selectedNodes: ', selectedNodes);
    const selectedData = selectedNodes.map(node => node.data );
    console.log('freddie selectedData: ', selectedData);
    const idCsv = selectedData.map(node => node.ID).join(',');
    return idCsv;
  }

  addItem(): void {
    this.employeeService.gotoForm('addEmployee');
  }

  editItem(): void {
    const selectedId = this.getSelectedRows();
    console.log('editItem selectedId: ', selectedId);
    const id = this.getSelectedId(selectedId);
    if (id) {
      this.employeeService.gotoForm('editEmployee', id);
    }
  }

  removeRows(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    console.log('selectedRows: ', selectedRows);
    // This looks deprecated so watch out when updating control
    this.agGrid.api.updateRowData({
      remove: selectedRows
    });
  }
  deleteItem(): void {
    const selectedId = this.getSelectedRows();
    console.log('delete selectedId: ', selectedId);
    const message = this.employeeService.deleteEmployee(this.selectedId)
      .subscribe(
        () => this.removeRows(),
        (err: any) => {
          const msg = `Error in deleting record. (Status ${err.status}): ${err.statusText}`;
          this.informMessage = msg;
          console.log('Delete err: ', err);
          // this.isMessageModalShown = true;
          alert(msg);
        }
      );
  }

  openModal(template: TemplateRef<any>): void {
    // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    // this.modalRef.hide();
    console.log('Deleting...');
    this.deleteItem();
  }

  decline(): void {
    // this.isMessageModalShown = false;
   //  this.modalRef.hide();
  }

}
