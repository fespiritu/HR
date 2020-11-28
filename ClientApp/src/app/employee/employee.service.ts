import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IEmployeeApi } from '../models/iemployee';
import { Observable } from 'rxjs';
import { Employee } from './../employee';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router) { }

  getEmployees(): Observable<IEmployeeApi[]> {
    return this.http.get<IEmployeeApi[]>(this.baseUrl + '/employees');

  }

  getEmployee(id: number): Observable<IEmployeeApi> {
    return this.http.get<IEmployeeApi>(this.baseUrl + '/employees/' + id);
  }
  gotoForm(routerPath: string, id?: number): void {
    let url = routerPath;
    if (id) {
      url += '/' + id;
    }
    this.router.navigateByUrl(url);
  }

  postEmployee(employee: Employee): any {
    console.log('service add: ', employee);
    return this.http.post<any>(this.baseUrl + '/employees', employee, { responseType: 'json', observe: 'response' });

    // .pipe(map(response => {
    //   if (response) {
    //     console.log('addEmployee response: ', response);
    //   }
    //   return response.body;
    // }));
  }

  putEmployee(employee: Employee): any {
    console.log('service put: ', employee);
    return this.http.put<any>(this.baseUrl + '/employees/' + employee.id, employee, { responseType: 'json', observe: 'response' });
  }

  editEmployee(id: number): void {
    console.log('service edit: ', id);
    this.router.navigateByUrl('editEmployee');
    this.gotoForm('editEmployee', id);
  }

  deleteEmployee(id: number): any {
    console.log('service delete: ', id);
    return this.http.delete<void>(`${this.baseUrl}/employees/${id}`);
      // .pipe(catchError(this.handleError));
  }
}
