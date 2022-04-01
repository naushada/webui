import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './accounting/account-list/account-list.component';
import { CreateAccountComponent } from './accounting/create-account/create-account.component';
import { UpdateAccountComponent } from './accounting/update-account/update-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { CreateManifestComponent } from './inventory/create-manifest/create-manifest.component';
import { OutInventoryComponent } from './inventory/out-inventory/out-inventory.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { MenubarComponent } from './menubar/menubar.component';
import { ShipmentReportComponent } from './reporting/shipment-report/shipment-report.component';
import { BulkUploadComponent } from './shipping/bulk-upload/bulk-upload.component';
import { CreateShipmentComponent } from './shipping/create-shipment/create-shipment.component';
import { DownloadTemplateComponent } from './shipping/download-template/download-template.component';
import { NewShipmentComponent } from './shipping/new-shipment/new-shipment.component';
import { ShipmentListComponent } from './shipping/shipment-list/shipment-list.component';
import { UpdateShipmentComponent } from './shipping/update-shipment/update-shipment.component';
import { MultipleAwbComponent } from './tracking/multiple-awb/multiple-awb.component';
import { SingleAwbComponent } from './tracking/single-awb/single-awb.component';
import { UpdateStatusAwbComponent } from './tracking/update-status-awb/update-status-awb.component';

const routes: Routes = [
  
  {path: 'batchShipment', component:BulkUploadComponent},
  {path: 'shipmentList', component:ShipmentListComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'webui', component:MenubarComponent},
  {path: 'singleShipment', component:SingleAwbComponent},
  {path: 'multipleShipment', component:MultipleAwbComponent},
  {path: 'updateShipmentStatus', component:UpdateStatusAwbComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'newShipment', component:NewShipmentComponent},
  {path: 'createShipment', component:CreateShipmentComponent},
  {path: 'downloadTemplate', component:DownloadTemplateComponent},
  {path: 'modifyShipment', component:UpdateShipmentComponent},
  {path: 'addItem', component:AddInventoryComponent},
  {path: 'removeItem', component:OutInventoryComponent},
  {path: 'manifest', component:CreateManifestComponent},
  {path: 'accountCreate', component:CreateAccountComponent},
  {path: 'accountList', component:AccountListComponent},
  {path: 'updateAccount', component:UpdateAccountComponent},
  {path: 'detailedReport', component:ShipmentReportComponent}
  //{path: '', component:LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
