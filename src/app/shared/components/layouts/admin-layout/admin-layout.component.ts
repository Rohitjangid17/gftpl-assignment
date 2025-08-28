import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isSidebarOpen: boolean = true;
  sidenavMode: 'side' | 'over' = 'side';

  private isBrowser!: boolean;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this._breakpointObserver.observe([Breakpoints.Handset])
        .subscribe(result => {
          if (result.matches) {
            // Mobile
            this.sidenavMode = 'over';
            this.isSidebarOpen = false;
          } else {
            // Desktop
            this.sidenavMode = 'side';
            this.isSidebarOpen = true;
          }
        });
    }
  }

  // sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
