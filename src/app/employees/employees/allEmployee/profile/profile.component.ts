import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { Roles } from 'src/app/entites/roles';
import { UserRoles } from 'src/app/entites/user-roles';
import { Users } from 'src/app/entites/users';
import { AdminRoleService } from 'src/app/services/admin/admin-role.service';
import { AdminUserRoleService } from 'src/app/services/admin/admin-user-role.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DatePipe, Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { EducationInformations } from 'src/app/entites/education-informations';
import { EmergencyContact } from 'src/app/entites/emergency-contact';
import { FamilyInformations } from 'src/app/entites/family-informations';
import { ExperienceInformations } from 'src/app/entites/experience-informations';
import { EducationInformationsService } from 'src/app/services/education-informations.service';
import { FamlyinformationtionService } from 'src/app/services/admin/famlyinformationtion.service';
import { ExperienceinformationService } from 'src/app/services/admin/experienceinformation.service';
import { PersonalInformations } from 'src/app/entites/personal-informations';
import { PersonalInformationsService } from 'src/app/services/personal-informations.service';
import { EmergencyContactService } from 'src/app/services/emergency-contact.service';
import { BankInformation } from 'src/app/entites/bank-information';
import { BankInformationService } from 'src/app/services/bank-information.service';
import { Projects } from 'src/app/entites/projects';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[DatePipe]

})
export class ProfileComponent implements OnInit {
  length: any;
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")


  myForm: FormGroup;
  Ec: FormGroup;
  Pi: FormGroup;
  Ei: FormGroup;
  Fi: FormGroup;
  E: FormGroup;
  Pl: FormGroup;

  constructor(private employeeUserService: EmployeeUsersService, private activateRoute: ActivatedRoute,
    private educationService: EducationInformationsService, private authService: AuthService,
    private adminRoleService: AdminRoleService,private datePipe:DatePipe,
    private adminUserRoleService: AdminUserRoleService,
    private emergencyContactservice: EmergencyContactService,

    private adminProjectService: AdminProjectService,
    private bankInformationService: BankInformationService,
    private usersService: AdminUsersService,
    private projectService: AdminProjectService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,

    private personalInformationsService: PersonalInformationsService,
    private builder: FormBuilder, private location: Location, private familyInformationService: FamlyinformationtionService
    , private experienceInformationService: ExperienceinformationService) {
    this.Fi = this.builder.group({
      name2: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      relationship2: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      dateOfBirth: ['', [Validators.required]],
      phone4: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$"), Validators.minLength(10), Validators.maxLength(10)]],


    }),
      this.Ei = this.builder.group({
        grade: ['', [Validators.required, Validators.pattern(/^([A-D]){1}/)]],
        degree: ['', [Validators.required,]],
        completeDate: ['', [Validators.required]],
        startingDate: ['', [Validators.required]],
        subject: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
        institution: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],

      }),
      //.........................................Emergency Contact..............

      this.Ec = this.builder.group({
        name: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
        name1: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.maxLength(15)]],
        relationship: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.maxLength(15)]],
        relationship1: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.maxLength(13)]],
        phone5: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
        phone1: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
        phone2: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$"), Validators.minLength(10), Validators.maxLength(10), this.phoneStartsWithGreaterThanFiveValidator()]],
        Phone3: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$"), Validators.minLength(10), Validators.maxLength(10), this.phoneStartsWithGreaterThanFiveValidator()]]
      }),

      this.Pi = this.builder.group({
        passportNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[A-Z]{4}[A-Z0-9]{6}$"), Validators.maxLength(10)]],
        passportExpiryDate: ['', [Validators.required]],
        nationality: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/)]],
        tel: ['', [Validators.required, Validators.pattern("^[0-9]{11}$"),]],
        religion: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(1), Validators.maxLength(10)]],
        maritalstatus: ['', [Validators.required]],
        employmentOfSpouse: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(1), Validators.maxLength(15)]],
        noOfChildren: ['', [Validators.required, Validators.pattern("^[0-9]{1}$")]],

      }),
      this.myForm = this.builder.group({ //........................Bank...................
        bankName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*\s*)+$/), Validators.minLength(4), Validators.maxLength(50)]],
        bankAccountNo: ['', [Validators.required]],
        ifscCode: ['', [Validators.required, Validators.pattern("^[A-Z]{4}[A-Z0-9]{6}$"), Validators.minLength(10), Validators.maxLength(10)]],
        panNo: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[A-Z0-9]{4}[0-9A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)]],


      });
    //..........................Profile Information............
    this.Pl = this.builder.group({
      phone: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$"), Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(20)]],
      // alternativePhone: ['', [Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$") , Validators.minLength(10), Validators.maxLength(10)]],
      ssn: ['', [Validators.required, Validators.pattern("^[A-Z]{2}[A-Z0-9]{4}$"), Validators.minLength(6), Validators.maxLength(6)]],
      gender: ['', [Validators.required,]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.maxLength(16)]],
      dob: ['', [Validators.required, this.validateDate]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.maxLength(16)]],

    }),





      //.....................................Experience..............
      this.E = this.builder.group({
        companyName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(50)]],
        periodTo: ['', [Validators.required]],
        periodFrom: ['', [Validators.required]],
        location: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(50)]],
        jobPosition: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],




      });
    this.userRole = new UserRoles();;
  }




  imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/';
  user: Users = new Users();
  confirmPassword = '';
  departments: Department[] = [];
  designations: Designation[] = [];
  isAdmin: any = false;
  roles: Roles[] = [];


  projects: Projects[] = [];
  bankInformation: BankInformation = new BankInformation();
  bankInformationList: BankInformation[] = [];
  personalInformations: PersonalInformations = new PersonalInformations();
  personalInformationsList: PersonalInformations[] = [];
  emergencyContact: EmergencyContact = new EmergencyContact();
  emergencyContactList: EmergencyContact[] = [];
  userRole: UserRoles;
  userRoles: UserRoles[] = [];

  department: Department = new Department();
  designation: Designation = new Designation();
  pageIndex = 0;
  pageSize = 100;

  project: Projects = new Projects();
  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.user.id = param['eid'];
      this.getUser();
      this.checkAdmin();
      this.getAllProjectOfUser();

    })
    this.setPermissions();
    this.setBaseUrl();
    this.getBankInformationById();
    this.getAllEducationInformation();
    this.getAllFamilyInformations();
    this.getAllExperienceInformation();
    this.getEmergencyContactById();
    this.getPersonalInformationsById();

    this.removeSidebarClass();
  }
  // checking age of employee
  validateDate(control: any): { [key: string]: boolean } | null {

    if (control.value) {
      let present = new Date();
      let dob = new Date(control.value);


      if (present.getFullYear() - dob.getFullYear() < 18) {
        return { 'invalidDate': true };
      }
    }
    return null;
  }

  getAllProjectOfUser() {
    this.adminProjectService.getProjectByUsersId(0, 1000, this.user.id).subscribe((data: any) => {
      this.projects = data.content;
    })
  }

  phoneStartsWithGreaterThanFiveValidator() {
    return (control: any) => {
      const phoneNumber = control.value;
      if (phoneNumber && phoneNumber.length > 0) {
        const firstDigit = parseInt(phoneNumber.charAt(0), 10);

        if (firstDigit <= 5) {
          
          return { phoneStartsWithLessThanSix: true };
        }
      }
      return null;
    };
  }

  getAllProject() {
    this.projectService.getAllProject(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.projects = data.content;
      this.length = data.totalElements;
    })
  }
  baseRoute = 'employee-dash'

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
  getDuration(start: Date, end: Date): number {
    return end.getTime() - start.getTime();
  }
  familyInformationList: FamilyInformations[] = [new FamilyInformations()];
  getAllEducationInformation() {

    this.educationService.getEducationInformationsByUserId(this.user.id).subscribe((data: any) => {
      if (data.length > 0)
        this.educationInformationList = data;
    })
  }

  addEducationInFormationDetails() {
    this.educationService.addEducationInformations(this.educationInformationList, this.user.id).subscribe((data: any) => {
      this.getAllEducationInformation();
    })
  }
  getAllFamilyInformations() {
    this.familyInformationService.getAllFamilyInformation(this.user.id).subscribe((data: any) => {
      if (data.length > 0)
        this.familyInformationList = data;

    })
  }
  addFamilyInformation() {
    this.familyInformationService.addFamilyInformations(this.familyInformationList, this.user.id).subscribe((data: any) => {
      this.getAllFamilyInformations();
    });
  }
  getAllExperienceInformation() {
    this.experienceInformationService.getExperienceInformationByUserId(this.user.id).subscribe((data: any) => {
      if (data.length > 0)
        this.experienceInformationList = data;

    })
  }
  addExperienceInformation() {
    this.experienceInformationService.addExperienceInformation(this.experienceInformationList, this.user.id).subscribe((data: any) => {
      this.getAllExperienceInformation();
    });
  }

  educationInformationList: EducationInformations[] = [new EducationInformations()];
  emergencyContactInformationList: EmergencyContact[] = [new EmergencyContact()];
  experienceInformationList: ExperienceInformations[] = [new ExperienceInformations()];


  isValidItem(): boolean {
    // Implement your validation logic here
    // Check if any of the fields in the last item in the list is null, empty, or less than 0
    const lastItem = this.familyInformationList[this.familyInformationList.length - 1];
    return !(
      lastItem.dateOfBirth=='' && // Check if title is not ''(blank) or empty
      lastItem.name== '' && // Check if description is not  '' or empty
      lastItem.phone== '' && // Check if unitCost is not  '' or less than 0
      lastItem.relationship== ''  // Check if quantity is not  '' or less than 0
    );
  }
  isValidItemEducationInformations(): boolean {
    // Implement your validation logic here
    // Check if any of the fields in the last item in the list is null, empty, or less than 0
    const lastItem = this.educationInformationList[this.educationInformationList.length - 1];
    return !(
      lastItem.completeDate=='' && // Check if title is not ''(blank) or empty
      lastItem.degree== '' && // Check if description is not  '' or empty
      lastItem.grade== '' && // Check if unitCost is not  '' or less than 0
      lastItem.institution== ''&&  // Check if quantity is not  '' or less than 0
      lastItem.startingDate== '' && // Check if unitCost is not  '' or less than 0
      lastItem.subject== '' // Check if unitCost is not  '' or less than 0
     
      );
  }

  isValidItemExperienceInformations(): boolean {
      // Implement your validation logic here
      // Check if any of the date fields in the last experience entry is not completely filled
      const lastExperience = this.experienceInformationList[this.experienceInformationList.length - 1];
      
      return (
          lastExperience.periodFrom !== null && // Check if periodFrom is not null
          lastExperience.periodTo !== null // Check if periodTo is not null
      );
      }

  // isValidItemEducationInformationList(): boolean {
  //   // Implement your validation logic here
  //   // Check if any of the fields in the last item in the list is null, empty, or less than 0
  //   const lastItem = this.educationInformationList[this.educationInformationList.length - 1];
    
  //   return (
  //       lastItem.dateOfBirth!=null && // Check if title is not null or empty
  //       lastItem.name!=null && // Check if description is not null or empty
  //       lastItem.phone!=null && // Check if unitCost is not null or less than 0
  //       lastItem.relationship!=null  // Check if quantity is not null or less than 0
  //   );
  // }

  

  addColumnForInformation(forType: String): void {
    switch (forType) {
      case "family":{
        if (this.isValidItem())
        this.familyInformationList.push(new FamilyInformations());
        else
             this.sweetAlertMessages.alertMessage('error',"First Give All Given Values"); 
      
          // this.familyInformationList = this.familyInformationList.concat(this.familyInformationList);
  
          break;
      }

      case "education":{
if(this.isValidItemEducationInformations())
        this.educationInformationList.push(new EducationInformations());
        else
        this.sweetAlertMessages.alertMessage('error',"First Give All Given Values"); 
 
        break;
      }
            case "experience":{
              if(this.isValidItemExperienceInformations())
        this.experienceInformationList.push(new ExperienceInformations());
        else
        this.sweetAlertMessages.alertMessage('error',"First Give All Given Values"); 
    
      }
        break;
      default:
        break;
    }
  }

  removeItemList(index: number, forType: string): void {

    switch (forType) {
      case "family":
        if (this.familyInformationList.length > 1) {
          this.familyInformationList.splice(index, 1);
        }
        break;

      case "education":
        if (this.educationInformationList.length > 1) {
          this.educationInformationList[index].isDelete = true;
          this.educationInformationList.splice(index, 1);
        }
        break;

      case "experience":
        if (this.experienceInformationList.length > 1) {

          this.experienceInformationList.splice(index, 1);
        }
        break;

      default:
        break;
    }
  }


  // get user by id
  getUser() {
    this.employeeUserService.getEmployeeById(this.user.id).subscribe((data: any) => {
      this.user = data;


      if (this.user.designation === null || this.user.designation === undefined)
        this.user.designation = new Designation();


    })
  }

  selectFile(event: any) {
    this.user.userImage = event.target.files[0];

    var reader = new FileReader();
    console.log(event);

    reader.onload = function (e) {
      let button = document.getElementById("file");
      button?.setAttribute("src", e!.target!.result + "");
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  
  
  // updating data
  updateEmployee() {
    
    this.usersService.updateEmployee(this.user).subscribe((data: any) => {
      const storedItem = localStorage.getItem('user');
      if (storedItem) {
        if (storedItem) {
          const parsedItem = JSON.parse(storedItem); // If stored as JSON
          if(parsedItem.id == data.id){
       this.authService.user.next(data);
             
          }
        }
        
        // Now you can use itemId for further checks or processing
      }
      
      this.getUser();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Employee Details Update SuccessFully !!'
      }).then(e => {
        localStorage.removeItem('user')
        // setTimeout(() => {
        //   localStorage.setItem('user', JSON.stringify(data))
        // }, 500);
      })

    })

  }


  checkAdmin() {
    let roles = this.authService.getUserRoles();
    this.isAdmin = roles?.includes("ADMIN");
    if (this.isAdmin) {
      this.getAllRoles();
      this.getUserRoles();
    }
  }
  getAllRoles() {
    this.adminRoleService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    })
  }

  getUserRoles() {
    this.adminUserRoleService.getUserRolesOfUser(this.user.id).subscribe((data: any) => {
      this.userRoles = data;
    })
  }
  setEditDate(id: any) {
    this.adminUserRoleService.getUserRoleById(id).subscribe((data: any) => {
      this.userRole = data;
    })
  }

  updateUserRole() {
    this.adminUserRoleService.updateUserRole(this.userRole).subscribe((data: any) => {
      this.getUserRoles();
      this.message('success', "User Role updated Successfully!!");
    })
  }

  setDelete(id: any) {
    this.userRole.id = id;
  }
  deleteUserRole() {
    this.adminUserRoleService.deleteUserRoleBYyId(this.userRole.id).subscribe((Data: any) => {
      console.log(Data);
      this.message('success', "User Role deleted Successfully!!");
    })
  }

  addUserRole() {
    this.userRole.userId = this.user.id;
    if (this.myForm.valid)
      this.adminUserRoleService.addUserRole(this.userRole).subscribe((data: any) => {
        console.log(data);
        this.userRole = new UserRoles();
        this.message('success', "User Role Added Successfully!!");
      })
  }


  message(icon: any, message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: icon,
      title: message,
    });
    this.getUserRoles();
    this.userRole = new UserRoles();
  }



  // add PersonalInformations
  addPersonalInformations() {
    this.personalInformationsService.addPersonalInformations(this.personalInformations, this.user.id).subscribe((data: any) => {

      this.getPersonalInformationsById();
      this.personalInformations = new PersonalInformations();


    }, (err: any) => {
      console.log(err)
    });

  }
  // get All PersonalInformations
  getPersonalInformationsById() {
    this.personalInformationsService.getPersonalInformationsById(this.user.id).subscribe((data: any) => {
      this.personalInformations = data;

    })
  }


  // add emergencyContact
  addEmergencyContact() {
    this.emergencyContactservice.addEmergencyContact(this.emergencyContact, this.user.id).subscribe((data: any) => {

      this.getEmergencyContactById();
      this.emergencyContact = new EmergencyContact();


    }, (err: any) => {
      console.log(err)
    });

  }

  // get All emergencyContact

  getEmergencyContactById() {
    this.emergencyContactservice.getEmergencyContactById(this.user.id).subscribe((data: any) => {
      this.emergencyContact = data;

    })
  }



  // add bankInformation
  addBankInformation() {
    this.bankInformationService.addBankInformation(this.bankInformation, this.user.id).subscribe((data: any) => {

      this.getBankInformationById();
      this.bankInformation = new BankInformation();


    }, (err: any) => {
      console.log(err)
    });

  }

  // get All bankInformation

  getBankInformationById() {
    this.bankInformationService.getBankInformationById(this.user.id).subscribe((data: any) => {
      this.bankInformation = data;

    })
  }


  openFile(target: any) {
    target.click();
  }

  removeSidebarClass() {
    let element = document.getElementById("sidebar");
    element?.classList.add("opened");
    console.log(element);

  }

}
