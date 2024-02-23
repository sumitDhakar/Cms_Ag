import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { AdminDashboard } from 'src/app/entites/admin-dashboard';
import { UserStatus } from 'src/app/entites/chat/user-status';
import { Clients } from 'src/app/entites/clients';
import { Invoice } from 'src/app/entites/invoice';
import { InvoicePayments } from 'src/app/entites/invoice-payments';
import { LeaveApplications } from 'src/app/entites/leave-applications';
import { Projects } from 'src/app/entites/projects';
import { HChartBar } from 'src/app/payload/hchart-bar';
import { ImageUtil } from 'src/app/payload/image-util';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { AdminDashboardService } from 'src/app/services/admin/admin-dashboard.service';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { InvoicePaymentsService } from 'src/app/services/invoice-payments.service';
import { LeaveApplicationService } from 'src/app/services/admin/adminLeave-application.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import Swal from 'sweetalert2';

export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  fill: any;
  tooltip: any;
  stroke: any;
  legend: any;
  markers: any;
  grid: any;
  title: any;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DatePipe]
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart") chart2: ChartComponent | undefined;
  public chartOptions2: Partial<ChartOptions>;

  hbarChart: HChartBar = new HChartBar();

  netProfit: any = []
  revenue: any = []
  constructor(private dashboardService: AdminDashboardService,
    private invoicesService: InvoicesService,
    private invoicePaymentsService: InvoicePaymentsService,
    private projectService: AdminProjectService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private leaveService: LeaveApplicationService,
    private clientService: ClientsService) {

    this.chartOptions = this.hbarChart.chartOptions;

    this.chartOptions2 = this.hbarChart.chartOptions2;
  }

  getTaskStatusOfProject(id: number) {

  }
  dashBoard: AdminDashboard = new AdminDashboard("");
  ms: any;
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  ngOnInit(): void {
    this.getDetails();
    this.getAllClientsList();
    this.getallInvoice();
    this.getAllInvoicePayments();
    this.getAllProjects();
    this.getTotalTaskDetails();
    this.setBaseUrl();
    this.getAllLeaveApplications();
    this.removeSidebarClass();
  }



  baseRoute = 'employee-dash'
  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();
  totalTaskDetails: any;

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  getDetails() {
    this.dashboardService.getDetails().subscribe((data: any) => {

      this.setCurrentMonhtStaticsForAdminBar(data);

    });
  }
  setCurrentMonhtStaticsForAdminBar(data: any) {
    this.dashBoard = data;

    this.ms = data.allMonthStatics;
    // this.ms[0] = this.ms[0]>0?this.ms[0]:0;
    // this.ms[2] = this.ms[2]>0?this.ms[2]:0;
    // this.ms[3] = this.ms[3]>0?this.ms[3]:0;
    // this.ms[4] = this.ms[4]>0?this.ms[4]:0;
    // this.ms[5] = this.ms[5]>0?this.ms[5]:0;

    this.setMonhtlyProgressBar();
  }

  employeeProgress: number = 0;
  earningsProgress: number = 0;
  expencesProgress: number = 0;

  setMonhtlyProgressBar() {
    this.employeeProgress = this.giveCalculations((this.ms[1]), this.dashBoard.totalEmployees) || 0;
    this.earningsProgress = this.giveCalculations((this.ms[3] - this.ms[2]), this.ms[3]) || 0;
    this.expencesProgress = this.giveCalculations((this.ms[5] - this.ms[4]), this.ms[5]) || 0;

    this.chartOptions.series[0].data = this.dashBoard.netProfit;
    this.chartOptions.series[1].data = this.dashBoard.revenue;

    this.chartOptions2.series[0].data = this.dashBoard.netProfit;
    this.chartOptions2.series[1].data = this.dashBoard.revenue;

    // alert(this.chartOptions.xaxis.categories)

    this.dashBoard.years.forEach(year => {
      this.chartOptions.xaxis.categories.push(year);
      this.chartOptions2.xaxis.categories.push(year);
      //  alert(this.chartOptions2.xaxis.categories)
    })

    window.dispatchEvent(new Event('resize'));
    this.updateStaticsProgressBar(this.dashBoard.staticsOfCompany);

  }
  leaveApplications: LeaveApplications[] = [];

  // get all leave applications
  getAllLeaveApplications() {
    this.leaveService.getAllLeaves(0, 2).subscribe((data: any) => {
      this.leaveApplications = data.content;
    })
  }

  getTotalTaskDetails() {
    this.dashboardService.getAllTaskDetailsByStatus().subscribe((data: any) => {
      this.totalTaskDetails = data.taskData;
      this.updateTasksProgressBar(this.totalTaskDetails);

    })
  }

  clientsList: Clients[] = [];
  getAllClientsList() {
    this.clientService.getAllClientsByOrder().subscribe((data: any) => {
      this.clientsList = data.content;
    })
  }


  // update Client Status
  updateClientStatus(id: number, status: string) {
    this.clientService.updateClientStatus(id, status).subscribe((data: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Client Status update!!'
      })
      this.getAllClientsList();
    });
  }

  invoiceList: Invoice[] = [];
  getallInvoice() {
    this.invoicesService.getAllInvoiceByOrder().subscribe((data: any) => {

      this.invoiceList = data.content;
    })
  }

  invoicePayments: InvoicePayments[] = []
  getAllInvoicePayments() {
    this.invoicePaymentsService.getAllInvoicePaymentsByOrder().subscribe((data: any) => {
      this.invoicePayments = data.content;

    })
  }

  projectsList: Projects[] = [];
  getAllProjects() {
    this.projectService.getAllProjectByOrder().subscribe((data: any) => {
      this.projectsList = data.content;
    })
  }


  deleteClientOrProjet(id: number, typeOf: string) {
    Swal.fire({
      title: "Do you want to delete the " + typeOf + "?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      / Read more about isConfirmed, isDenied below /
      if (result.isConfirmed) {

        switch (typeOf) {
          case "client":
            console.log('Processing for Case 1');
            this.clientService.deleteClient(id).subscribe((data: any) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,


              })
              Toast.fire({
                icon: 'success',
                title: 'Client Deleted SuccesFully!!'
              })
              this.getAllClientsList();
            });


            break;

          case "project":
            this.projectService.deleteProjectById(id).subscribe((data: any) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              })
              Toast.fire({
                icon: 'success',
                title: 'Project Deleted succesfully!!'
              })
              this.getAllProjects();
            });

            break;

          // Add more cases as needed

          default:
            Swal.fire("Something Went Wrong", "", "info");

            console.log('Default case');

        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  //tasks progress bar status
  progress1: number = 0;
  progress2: number = 0;
  progress3: number = 0;
  progress4: number = 0;
  progress5: number = 0;

  //statics progress bar values

  todayPresent: number = 0;
  pendingTasks: number = 0;
  CompletedProjects: number = 0;
  opentickets: number = 0;
  closedTickets: number = 0;


  updateTasksProgressBar(totalTaskDetails: any) {

    this.progress1 = this.giveCalculations(totalTaskDetails[2], totalTaskDetails[0]);
    this.progress2 = this.giveCalculations(totalTaskDetails[3], totalTaskDetails[0]);
    this.progress3 = this.giveCalculations(totalTaskDetails[4], totalTaskDetails[0]);
    this.progress4 = this.giveCalculations(totalTaskDetails[5], totalTaskDetails[0]);
    this.progress5 = this.giveCalculations(totalTaskDetails[6], totalTaskDetails[0]);


  }

  updateStaticsProgressBar(staticsOfCompany: any[][]) {
    this.todayPresent = this.giveCalculations(staticsOfCompany[4][2], this.dashBoard.totalEmployees);
    this.pendingTasks = this.giveCalculations(staticsOfCompany[1][2], staticsOfCompany[1][1]);
    this.CompletedProjects = this.giveCalculations(staticsOfCompany[0][2], staticsOfCompany[0][1]);
    this.opentickets = this.giveCalculations(staticsOfCompany[2][2], staticsOfCompany[2][1]);
    this.closedTickets = this.giveCalculations(staticsOfCompany[3][2], staticsOfCompany[3][1]);
  }


  giveCalculations(value: number, total: number): number {
    return Number(((value / total) * 100).toFixed(2));
  }


  removeSidebarClass() {
    let element = document.getElementById("sidebar");
    element?.classList.add('opened');
    console.log(element);

  }

}
