import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

//import { SharedModule } from './shared/shared.module';
import { NewShipmentComponent } from './shipping/new-shipment/new-shipment.component';
import { BulkUploadComponent } from './shipping/bulk-upload/bulk-upload.component';
import { SingleAwbComponent } from './tracking/single-awb/single-awb.component';
import { MultipleAwbComponent } from './tracking/multiple-awb/multiple-awb.component';
import { UpdateStatusAwbComponent } from './tracking/update-status-awb/update-status-awb.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ShipmentListComponent } from './shipping/shipment-list/shipment-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MultipleAwbListComponent } from './tracking/multiple-awb-list/multiple-awb-list.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { MenubarComponent } from './menubar/menubar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDialogModule } from '@angular/material/dialog';

import { ClarityModule } from "@clr/angular";
import { DialogSingleAwbComponent } from './tracking/dialog-single-awb/dialog-single-awb.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatExpansionModule }  from '@angular/material/expansion';
import { DownloadTemplateComponent } from './shipping/download-template/download-template.component';
import { UpdateShipmentComponent } from './shipping/update-shipment/update-shipment.component';
import { CreateShipmentComponent } from './shipping/create-shipment/create-shipment.component';
import { CreateAccountComponent } from './accounting/create-account/create-account.component';
import { AccountListComponent } from './accounting/account-list/account-list.component';
import { UpdateAccountComponent } from './accounting/update-account/update-account.component';
import { CreateManifestComponent } from './inventory/create-manifest/create-manifest.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { OutInventoryComponent } from './inventory/out-inventory/out-inventory.component';
import { ShipmentReportComponent } from './reporting/shipment-report/shipment-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NewShipmentComponent,
    BulkUploadComponent,
    SingleAwbComponent,
    MultipleAwbComponent,
    UpdateStatusAwbComponent,
    NavComponent,
    DashboardComponent,
    ShipmentListComponent,
    MultipleAwbListComponent,
    LoginPageComponent,
    MenubarComponent,
    DialogSingleAwbComponent,
    DownloadTemplateComponent,
    UpdateShipmentComponent,
    CreateShipmentComponent,
    CreateAccountComponent,
    AccountListComponent,
    UpdateAccountComponent,
    CreateManifestComponent,
    AddInventoryComponent,
    OutInventoryComponent,
    ShipmentReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMatFileInputModule,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule,
    MatListModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    LayoutModule,
    MatGridListModule,
    MatCardModule,
    MatSortModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    ClarityModule,
    MatDialogModule,
    MatDatepickerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
