import { Component, OnInit } from '@angular/core';
import { UserDashboard } from '../../model/user/dashboard';
import { UserDashboardService } from '../../services/user-dashboard.service';
import { IApiResponse } from '../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userDashboardData: UserDashboard | any = null;



  constructor(
    private userDashboardService: UserDashboardService,

  ) { }

  ngOnInit(): void {

    this.userDashboardService.getDashboardData().subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        this.userDashboardData = res.data;
      }
    });

  }


}
