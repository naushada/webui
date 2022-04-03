import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shipment, CountryName, Account } from 'src/app/shared/message-struct';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { PubsubService } from 'src/app/shared/pubsub.service';
import {formatDate} from '@angular/common';
import { XlsServiceService } from 'src/app/shared/xls-service.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-shipment-report',
  templateUrl: './shipment-report.component.html',
  styleUrls: ['./shipment-report.component.scss']
})
export class ShipmentReportComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Shipment>();
  shipmentList: Array<Shipment> = new Array<Shipment>();
  accountList:Array<Account> = new Array<Account>();
  acctInfo!: Account;
  Country = CountryName;

  shipmentReportColumns:Array<string> = [
    "trackingNo", "altRefNo", "accountCode", "createdOn", "status", "notes", "updatedOn",
    "createdBy","senderRefNo","senderName","senderCountry","senderAddress","senderCity","senderState",
    "senderPostalCode","senderContact","senderPhone","senderEmail", "serviceType","numberOfItems",
    "goodsDescription","goodsValue","customsValue","weight","weightUnit","codAmount","currency",
    "sku","receiverName","receiverAddress","receiverCity","receiverState","receiverPostalCode",
    "receiverContact","receiverPhone","receiverEmail",
  ];

  shipmentReportForm!:FormGroup;

  subsink= new SubSink();
  constructor(private fb:FormBuilder, private rest: RestApiService, private pubsub: PubsubService, private xls:XlsServiceService) { 

    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});

    this.shipmentReportForm = this.fb.group({
      startDate: [formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')],
      endDate:[formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')],
      receiverCountry: CountryName[1],
      accountCode:''
    });
  }

  ngOnInit(): void {
  }

  onShipmentReport() {

    let startDate = formatDate(this.shipmentReportForm.value.startDate, 'dd/MM/yyyy', 'en');
    let endDate = formatDate(this.shipmentReportForm.value.endDate, 'dd/MM/yyyy', 'en');
    let accountCode = this.shipmentReportForm.value.accountCode;

    let acList = new Array<string>();
    if(accountCode.length > 0) {
      accountCode = accountCode.trim();
      acList = accountCode.split("\n");
      this.rest.getShipments(startDate, endDate, this.shipmentReportForm.value.receiverCountry, acList).subscribe(
      (sh: Shipment[]) => {this.shipmentList = sh;});
    } else {
      this.rest.getShipments(startDate, endDate, this.shipmentReportForm.value.receiverCountry).subscribe(
        (sh: Shipment[]) => {
          this.shipmentList = sh;
          this.shipmentList.forEach((elm: Shipment) => {
            let val:any = {
              trackingNo: elm.shipmentNo,
              altRefNo: elm.altRefNo,
              accountCode: elm.accountCode,
              createdOn: elm.createdOn,
              status: elm.activity[elm.activity.length - 1].event,
              notes: elm.activity[elm.activity.length - 1].notes,
              updatedOn: elm.activity[elm.activity.length -1].date,
              createdBy: elm.activity[elm.activity.length - 1].updatedBy,
              senderRefNo: elm.referenceNo,
              senderName: elm.name,
              senderCountry: elm.country,
              senderAddress: elm.address,
              senderCity: elm.city,
              senderState: elm.state,
              senderPostalCode: elm.postalCode,
              senderContact: elm.contact,
              senderPhone: elm.phone,
              senderEmail: elm.email,
              serviceType: elm.service,
              numberOfItems: elm.noOfItems,
              goodsDescription: elm.description,
              goodsValue: elm.goodsValue,
              customsValue: elm.customValue,
              weight: elm.weight,
              weightUnit: elm.weightUnit,
              codAmount: elm.codAmount,
              currency: elm.currency,
              sku: elm.sku,
              receiverName: elm.receiverName,
              receiverAddress: elm.receiverAddress,
              receiverCity: elm.receiverCity,
              receiverState: elm.receiverState,
              receiverPostalCode: elm.receiverPostalCode,
              receiverContact: elm.receiverContact,
              receiverPhone: elm.receiverPhone,
              receiverEmail: elm.receiverEmail
            }

            this.dataSource.data.push(val);
          }) 
        });
    }
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  onExportToExcel() {
    this.xls.exportToExcelFile(this.shipmentList, "detailedReport.xlsx");
  }
}
