import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomAlertComponent } from "./pages/custom-alert/custom-alert.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financial-activity-app';
}
