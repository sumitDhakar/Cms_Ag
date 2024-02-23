import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulePermissions } from 'src/app/entites/module-permissions';
import { Permissions } from 'src/app/entites/permissions';
import { Roles } from 'src/app/entites/roles';
import { StringSplitPipe } from 'src/app/materials/utils/string-split.pipe';

import { AdminPermissionService } from 'src/app/services/admin/admin-permission.service';
import { AdminRoleService } from 'src/app/services/admin/admin-role.service';
import { ModulePermissionsService } from 'src/app/services/admin/module-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss'],
  providers: [StringSplitPipe]
})
export class RolesAndPermissionsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllRoles();
    this.getModulePermissionByRole(1);
  }
  form: FormGroup;
  role!: Roles;
  modulePermissions: ModulePermissions[] = [];
  roles: Roles[] = [];


  constructor(private roleService: AdminRoleService, private fb: FormBuilder, private permissionService: AdminPermissionService
    , private modulePermission: ModulePermissionsService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]]
    });
    this.role = new Roles();
  }

  addForm() {
    this.role = new Roles();
  }

  addRole() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.role);


      this.roleService.addRole(this.role).subscribe((data: any) => {
        console.log(data);
        this.role = new Roles();
      }, (err) => {
        console.log(err);


        if (err.error.status == 409) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          Toast.fire({
            title: 'Role already exists!!',
            icon: 'error',
            text: 'Try another Role name!!!',
            timer: 5000 // 5 seconds,
          })


        }

      })
    }
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: any) => {
      console.log(data);
      this.roles = data;
      if (this.roles)
        this.getModulePermissionByRole(this.roles[0].id);
    })
  }


  getRoleBydId(id: any) {
    this.roleService.getRolesById(id).subscribe((data: any) => {
      console.log(data);
      this.role = data;
    })
  }

  updateRole() {
    this.roleService.updateRole(this.role).subscribe((data: any) => {
      this.getAllRoles();
    })
  }

  setDeleteData(id: any) {
    this.role.id = id;
  }

  deleteRoleById() {
    alert(this.role.id)
  }

  checkValidations(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getModulePermissionByRole(id: any) {
    this.modulePermission.getModulePermissions(id).subscribe((data: any) => {
      this.modulePermissions = data;
      console.log(this.modulePermissions);
    })
  }

updatePermissions(){
  let permissions:any[] = [];
  this.modulePermissions.forEach(m =>{
    m.permissions.forEach(p =>{
      permissions.push(p);
      
    })
  })
console.log(permissions);
this.permissionService.updateAllPermissions(permissions).subscribe((data:any)=>{
  console.log(data);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  Toast.fire({
    title: 'Updated ',
    icon: 'success',
    text: 'Updated successfully.',
    timer: 5000 // 5 seconds,
  })
})


}



  toggleSideNav(temp: any) {
    if (temp.style.display === 'none')
      temp.style.display = 'block';
    else
      temp.style.display = 'none';

  }

}
