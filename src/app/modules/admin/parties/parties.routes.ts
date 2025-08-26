import { Routes } from '@angular/router';
import { PartiesComponent } from './parties.component';

export const PARTIES_ROUTES: Routes = [
    {
        path: '',
        component: PartiesComponent,
    },
    //   {
    //     path: 'new',
    //     component: PartyFormComponent,
    //   },
    //   {
    //     path: ':id/edit',
    //     component: PartyFormComponent,
    //   },
    //   {
    //     path: ':id/details',
    //     component: PartyDetailsComponent,
    //   },
];
