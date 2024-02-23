import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/entites/comment';
import { commentsRequestTs } from 'src/app/entites/comments-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProjectCommentsService {

  baseUrl = environment.hostUrl + "/admin/projectComments"

  constructor(private httpClient: HttpClient) { }

  addProjectComments(projectCommnents: commentsRequestTs) {

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
    const formData = new FormData();

    if (projectCommnents.files.length != 0) {
      for (const file of projectCommnents.files)
        formData.append("files[]", file);
    }
    else {
      formData.append("files[]", 'null');
    }
      formData.append("data",new Blob([JSON.stringify(projectCommnents)],{type:'application/json'}));
    return this.httpClient.post(`${this.baseUrl}/`, formData,{headers});
  }

  updateProjectComments(projectCommnents: Comment) {
    return this.httpClient.put(`${this.baseUrl}/`, projectCommnents);
  }

  getProjectCommentById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  getProjectCommentsByProjectId(pageNo: number=0, pageSize: number=100000, projectId: number) {
    return this.httpClient.get(`${this.baseUrl}/project/${pageNo}/${pageSize}/${projectId}`);
  }

  getProjectCommentsByTaskId(pageNo: number, pageSize: number, taskId: number) {
    return this.httpClient.get(`${this.baseUrl}/project/${pageNo}/${pageSize}/${taskId}`);
  }

 
}
