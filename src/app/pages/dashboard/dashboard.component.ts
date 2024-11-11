import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { DashboardRow } from 'src/app/models/dashboard-row';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  rows: Observable<DashboardRow[]> = of();
  ds: MatTableDataSource<DashboardRow> = {} as MatTableDataSource<DashboardRow>;
  columns: string[] = ['name', 'address', 'phone'];
  
  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.display().subscribe(e => {
      console.log(e);
      this.ds = new MatTableDataSource<DashboardRow>(e);
      this.ds.paginator = this.paginator;
      this.rows = this.ds.connect();
    });
  }
}
