import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  logout() {
    this._authService.logout().subscribe({
      next: () => {
        this._authService.clearToken();
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error', err);
        this._authService.clearToken();
        this._router.navigate(['/login']);
      }
    })
  }
}
