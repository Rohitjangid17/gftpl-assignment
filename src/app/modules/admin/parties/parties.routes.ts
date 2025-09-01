import { Routes } from '@angular/router';
import { PartiesComponent } from './parties.component';
import { AdminLayoutComponent } from '../../../shared/components/layouts/admin-layout/admin-layout.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { authGuard } from '../../../core/guards/auth.guard';

export const PARTIES_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'parties',
        component: PartiesComponent,
      },
      {
        path: 'parties/create-party',
        component: CreatePartyComponent
      },
      {
        path: 'parties/update-party/:id',
        component: CreatePartyComponent,
      },
    ],
  },
];
