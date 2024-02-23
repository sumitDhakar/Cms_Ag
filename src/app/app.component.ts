import { Component,NgZone,Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScriptLoaderServiceService } from './materials/utils/script-loader-service.service';
import { JavaScriptLoaderService } from './materials/jsLoader/java-script-loader.service';
import { AuthService } from './services/auth.service';
import { AdminDashboardComponent } from './main/dashboard/adminDashboard/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { AdminGuard } from './materials/guards/admin.guard';
import { Router } from '@angular/router';
import { EmployeeDashboardComponent } from './main/dashboard/employeeDashboard/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from './home/Employee/employee-home/employee-home.component';
import { RouteUtilService } from './materials/route-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private scriptLoader: ScriptLoaderServiceService,private jsLoader:JavaScriptLoaderService,private ngZone:NgZone
    ,private authService:AuthService,private router:Router,  private routeUtils:RouteUtilService) {}

  ngOnInit() {
    this.setRoutes();
    this.ngZone.runOutsideAngular(()=>{
      const script = document.createElement('script');
      script.src = '../assets/js/app.js';
      script.type = 'text/javascript';
      script.onload = () => {
        // The JavaScript file is loaded, and you can now use its functionality
        // Ensure your JavaScript code here is outside the Angular zone
          
      };
  
      // Append the script to the document
      document.head.appendChild(script);

      const script1 = document.createElement('script');
      script1.src = '../assets/js/jquery.slimscroll.min.js';
      script1.type = 'text/javascript';
      script1.onload = () => {
        // The JavaScript file is loaded, and you can now use its functionality
        // Ensure your JavaScript code here is outside the Angular zone
       };
  
      // Append the script to the document
      document.head.appendChild(script1);
  
    })
  }

  loadScript() {
    const scriptSrc = './assets/js/jquery.slimscroll.min.js';
    this.scriptLoader.loadScript(scriptSrc).subscribe(
      () => {
        console.log('Script loaded successfully');  
        // You can now use functions from the loaded script
      },
      (error) => {
        console.error('Error loading script:', error);
      }
    );
  }


setRoutes(){
  this.routeUtils.setRoutes();
}
}
