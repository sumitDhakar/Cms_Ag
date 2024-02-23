export class AdminDashboard {
  totalClients = 0;
  totalProjects = 0;
  totalTasks = 0;
  totalEmployees = 0;
  staticsOfCompany: any[][];
  hbData: [];
  netProfit: [] = [];
  revenue: [] = [];
  years: [] = [];
  allMonthStatics: [] = [];

  constructor(data: any) {
    this.totalProjects = data.totalProjects;
    this.totalClients = data.totalClients;
    this.totalTasks = data.totalTasks;
    this.totalEmployees = data.totalEmployees;
    this.staticsOfCompany = data.staticsOfCompany;
    this.hbData = data.hbData;
    this.netProfit = data.netProfit;
    this.revenue = data.revenue;
    this.years = data.years;
    this.allMonthStatics = data.allMonthStatics;
  }

}
