import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'alfa-laval-assignment';
  isDarkTheme: boolean = false;

  updateTheme($event) {
    this.isDarkTheme = $event;
  }

}
