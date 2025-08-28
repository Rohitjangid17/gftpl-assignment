import { Routes } from '@angular/router';
import { PartiesComponent } from './parties.component';
import { AdminLayoutComponent } from '../../../shared/components/layouts/admin-layout/admin-layout.component';

export const PARTIES_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: PartiesComponent,
      },
    ],
  },
];
