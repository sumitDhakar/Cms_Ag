import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../../entites/users';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  baseUrl = environment.hostUrl + '/admin/allEmployee';
  constructor(private httpClient: HttpClient) { }

  // adding employees
  addEmployee(user: Users) {
   
   

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
    const formData = new FormData();


    if (user.userImage != null) {
      formData.append("files[]", user.userImage);
    }

    else {
      formData.append("files[]", 'null');
    }

    // user.firstName = "";
    formData.append("data", new Blob([JSON.stringify(user)], { type: 'application/json' }));

    return this.httpClient.post(`${this.baseUrl}/EMPLOYEE`, formData, { headers });
  }



  addAdmin(user: Users) {
    return this.httpClient.post(`${this.baseUrl}/ADMIN`, user);
  }
  addClient(user: Users) {
    return this.httpClient.post(`${this.baseUrl}/CLIENT`, user);
  }
  addUser(user: Users) {
    return this.httpClient.post(`${this.baseUrl}/USER`, user);
  }
  // update Employee
  updateEmployee(user: Users) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
    const formData = new FormData();


    if (user.userImage != null) {
      formData.append("image", user.userImage);
    }

    else {
      formData.append("image", 'null');
    }


    formData.append("data", new Blob([JSON.stringify(user)], { type: 'application/json' }));


    return this.httpClient.put(`${environment.hostUrl}/employee/allEmployee/`, formData, { headers });
  }



  getEmployeeById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get All Employee
  getAllEmployees(pageNo: number, pageSize: number, roleId: number) {
    return this.httpClient.get(`${this.baseUrl}/employeeList/${pageNo}/${pageSize}/${roleId}`);
  }


  // get All Employee
  // getAllEmployeesListPayload(pageNo: number, pageSize: number) {
  //   return this.httpClient.get(`${this.baseUrl}/employeeList/${pageNo}/${pageSize}`);
  // }



  // get All Users
  getAllUsers(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // get all owners
  getAllOwners(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/owner/${pageNo}/${pageSize}`);
  }

  getUserById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }



  // search employee
  searchEmployee(pageNo: number, pageSize: number, user: Users) {
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`, user);
  }

  // delete employee
  deleteEmployee(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

}
