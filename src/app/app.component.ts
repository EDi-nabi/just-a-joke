import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideMenu: boolean = false;

  constructor() {}

  toggleSidemenu(): void {
    this.sideMenu = !this.sideMenu;
  }
}
