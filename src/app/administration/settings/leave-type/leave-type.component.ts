import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LeaveType } from 'src/app/entites/leave-type';
import { LeaveTypesService } from 'src/app/services/admin/leave-types.service';
import { EmployeeLeaveTypesService } from 'src/app/services/employee/employee-leave-types.service';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent   implements OnInit {

  leaveType: LeaveType = new LeaveType();
  leaveTypes: LeaveType[] = [];
  isListView: any;

  

  ngOnInit(): void {
    this.getAllLeaveType();
    
       
  }

  constructor(private leaveTypeService: LeaveTypesService,
    private employeeLeaveTpeService:EmployeeLeaveTypesService) {
  
  }

  
  // add LeaveType
  addLeaveType() {


    this.leaveTypeService.addLeaveType(this.leaveType).subscribe((data: any) => {

      this.getAllLeaveType();
      this.leaveType=new LeaveType();
    }, (err: any) => {
      console.log(err)
    });

  }

  // get All LeaveType
  getAllLeaveType() {
    this.employeeLeaveTpeService.getAllLeaveTypes().subscribe((data: any) => {
      
      this.leaveTypes = data;
      this.length = data.totalElements;
    })
  }

  deleteId=0;
  confirm(id: any) {
    this.deleteId= id;
  }

  deleteLeaveType() {

    this.leaveTypeService.deleteLeaveTypeById(this.deleteId).subscribe((data: any) => {
      this.getAllLeaveType();
    })
  }

  setEditData(id: number) {
    this.employeeLeaveTpeService.getLeaveTypesById(id).subscribe((data: any) => {
      this.leaveType = data;
      
    });

  }
  updateLeaveType() {
    this.leaveTypeService.updateLeaveType(this.leaveType).subscribe((data: any) => {

      this.getAllLeaveType();

    })
  }


  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }

  updateLeaveTypeStatus(id:number,status:string){
  
    
this.leaveTypeService.updateLeaveTypeStatus(status,id).subscribe((data:any)=>{
this.getAllLeaveType();
});
  }


  // pagination

  length = 50;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5,10];
  pageSize=10;
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
    this.getAllLeaveType();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  

}
