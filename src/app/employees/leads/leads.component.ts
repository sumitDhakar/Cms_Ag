import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { ProjectMembers } from 'src/app/entites/project-members';
import { Projects } from 'src/app/entites/projects';
import { ImageUtil } from 'src/app/payload/image-util';
import { AdminProjectMemberService } from 'src/app/services/admin/admin-project-member.service';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  constructor(private projectService: AdminProjectService, private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.setPermissions();
    this.setBaseUrl();
  }

  baseRoute = 'employee-dash'
  imageUtils:ImageUtil=new ImageUtil();
  imageUrl  =this.imageUtils.getImageUrl();         
  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  permissions: Permissions = new Permissions();
  setPermissions() {
    this.authService.isUserPermitted(this.location.path(), false).then(data => {
      if (data == null)
        this.authService.navigate(this.baseRoute);
      this.permissions = data;
    })
  }

  projects: Projects[] = [];


  getAllProjects() {
    this.projectService.getAllProject(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.projects = data.content;
      console.log(data);

    })


  }



  // pagination

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllProjects();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }


}
