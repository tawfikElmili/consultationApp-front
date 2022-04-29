import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultationAddComponent } from 'src/app/pages/consultation-add/consultation-add.component';
import { ConsultationListComponent } from 'src/app/pages/consultation-list/consultation-list.component';
import { UserListComponent } from 'src/app/pages/user-list/user-list.component';
import { MedicationAddModalComponent } from 'src/app/pages/medication-add-modal/medication-add-modal.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  entryComponents: [ MedicationAddModalComponent ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ConsultationAddComponent,
    ConsultationListComponent,
    UserListComponent,
    MedicationAddModalComponent
  ]
})

export class AdminLayoutModule {}
