import { ConsultationAddComponent } from './../../pages/consultation-add/consultation-add.component';
import { UserListComponent } from './../../pages/user-list/user-list.component';
import { ConsultationListComponent } from './../../pages/consultation-list/consultation-list.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'consultation-list', component: ConsultationListComponent },
    { path: 'consultation-add', component: ConsultationAddComponent },
    { path: 'consultation-edit/:id', component: ConsultationAddComponent },
];
