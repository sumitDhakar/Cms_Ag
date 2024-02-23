import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { company_settings } from "src/app/entites/Company_Settings";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CompamySettingsService
{

    baseUrl = environment.hostUrl +"/admin/CompanySettings"

    constructor(private httpClient:HttpClient) { }



getCompanySettings(id:number){
return this.httpClient.get(`${this.baseUrl}/${id}`);

}

updateCompanySettings(companysetting:company_settings)
{

  return this.httpClient.put(`${this.baseUrl}/`,companysetting);
}

}
