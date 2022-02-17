import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { MenubarComponent } from './menubar/menubar.component';
import { BulkUploadComponent } from './shipping/bulk-upload/bulk-upload.component';
import { NewShipmentComponent } from './shipping/new-shipment/new-shipment.component';
import { ShipmentListComponent } from './shipping/shipment-list/shipment-list.component';
import { MultipleAwbComponent } from './tracking/multiple-awb/multiple-awb.component';
import { SingleAwbComponent } from './tracking/single-awb/single-awb.component';
import { UpdateStatusAwbComponent } from './tracking/update-status-awb/update-status-awb.component';

const routes: Routes = [
  
  {path: 'createShipment', component:NewShipmentComponent},
  {path: 'createBatchShipment', component:BulkUploadComponent},
  {path: 'shipmentList', component:ShipmentListComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'webui', component:MenubarComponent},
  {path: 'singleShipment', component:SingleAwbComponent},
  {path: 'multipleShipment', component:MultipleAwbComponent},
  {path: 'updateShipmentStatus', component:UpdateStatusAwbComponent},
  {path: 'login', component:LoginPageComponent},
  {path: '', component:LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
