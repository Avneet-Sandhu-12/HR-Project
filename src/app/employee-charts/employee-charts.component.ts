import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-employee-charts',
  templateUrl: './employee-charts.component.html',
  styleUrls: ['./employee-charts.component.css']
})
export class EmployeeChartsComponent  implements OnInit {
  barChartOptions: ChartOptions<'bar'> = { responsive: true };
  pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  lineChartOptions: ChartOptions<'line'> = { responsive: true };

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.chartDataService.getEmployeeData().subscribe((data) => {
      this.processData(data);
    });
  }
  processData(data: any[]): void {
    const ageGroups: any = {};
    const professions: any = {};
    const claimedAmountsByMonth: any = {};

    data.forEach(emp => {
      
      const ageGroup = this.getAgeGroup(emp.age);
      ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1;

      
      professions[emp.profession] = (professions[emp.profession] || 0) + 1;

      claimedAmountsByMonth[emp.month] = (claimedAmountsByMonth[emp.month] || 0) + emp.claimedAmount;
    });


    this.barChartData = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Employees by Age Group',
          data: Object.values(ageGroups),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };


       this.pieChartData = {
        labels: Object.keys(professions),
        datasets: [
          {
            data: Object.values(professions),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }
        ]
      };

        
    this.lineChartData = {
      labels: Object.keys(claimedAmountsByMonth),
      datasets: [
        {
          label: 'Avg Claimed Amount',
          data: Object.values(claimedAmountsByMonth),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        }
      ]
    };
  }
  getAgeGroup(age: number): string {
    if (age < 30) return 'Under 30';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    return '50+';
  }
}
