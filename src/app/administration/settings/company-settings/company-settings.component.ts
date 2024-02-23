
import { Component, OnInit } from '@angular/core';
import { company_settings } from 'src/app/entites/Company_Settings';
import { CompamySettingsService } from 'src/app/services/admin/admin-company-settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit{
  

  companysettings:company_settings=new company_settings();
  
  constructor(private companysettingsservice:CompamySettingsService){}
  ngOnInit(): void {
   this.setEditData();
  }


  setEditData() {
    this.companysettingsservice.getCompanySettings(1).subscribe((data: any) => {
console.log(data);
this.companysettings=data;
    });
  }

  updateCompanySettings() {
    this.companysettingsservice.updateCompanySettings(this.companysettings).subscribe((data: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Company Information Changed SuccessFully !!'
      }).then(e => {
       this.setEditData();
      })

    })
  }

}
