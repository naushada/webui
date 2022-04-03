import { Injectable, OnDestroy, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import { Account, ExcelDataFormat, Shipment } from './message-struct';
import { RestApiService } from './rest-api.service';
import { PubsubService } from './pubsub.service';
import { Subscription } from 'rxjs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class XlsServiceService implements OnDestroy, OnInit {

  private mBtnStatus: boolean;
  public loggedInAcc: Account = new Account();
  private subs!: Subscription;
  public xlsRows: Array<ExcelDataFormat> = new Array<ExcelDataFormat>();
  public accountCodeList: Array<string> = new Array<string>();
  public custInfoList: Map<string, Account> = new Map<string, Account>(); 

  constructor(private rest: RestApiService, 
              private pubsub: PubsubService) { 
    this.mBtnStatus = false;
  }

  ngOnInit(): void {
    this.subs = this.pubsub.onAccount.subscribe((acc: Account) => {this.loggedInAcc = acc;});  
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  get isBtnDisabled(): boolean {
    return(this.mBtnStatus);
  }

  set isBtnDisabled(st: boolean) {
    this.mBtnStatus = st;
  }

  public getRidofDupElement(data: Array<string>) {
    return data.filter((value, idx) => data.indexOf(value) === idx);
  }

  public onExcelUpload() {

  }
  
  public onExcelSelect(evt: any, fName:string) {
    this.processExcelFile(evt, fName);
  }

  public exportToExcelFile(json: any[], excelFileName: string): void {
    let content: Array<string> = new Array<string>();
    content.length = 0;

    json.forEach((elm: Shipment) => {
      let ent: any = {
        'CreatedOn': elm.createdOn,
        'CreatedBy': elm.createdBy,
        'ShipmentNo': elm.shipmentNo,
        'Autogenerate': elm.autogenerate,
        'AlternateReferenceNo': elm.altRefNo,
        'ReferenceNo': elm.referenceNo,
        'AccountCode': elm.accountCode,
        'CompanyName': elm.companyName,
        'Name': elm.name,
        'Country': elm.country,
        'Address': elm.address,
        'City': elm.city,
        'Status': elm.activity[elm.activity.length - 1].event,
        'Notes': elm.activity[elm.activity.length - 1].notes,
        'UpdatedOn': elm.activity[elm.activity.length - 1].date + ':' + elm.activity[elm.activity.length - 1].time,
        'Contact': elm.contact,
        'Phone': elm.phone,
        'Email': elm.email,
        'ReceiverCountryTaxId': elm.recvCountryTaxId,
        'ServiceType': elm.service,
        'NumberOfItems': elm.noOfItems,
        'GoodsDescription': elm.description,
        'GoodsValue': elm.goodsValue,
        'CustomsValue': elm.customValue,
        'Weight': elm.weight,
        'WeightUnit': elm.weightUnit,
        'CubicWeight': elm.cubicWeight,
        'CODAmount': elm.codAmount,
        'VAT': elm.vat,
        'Currency': elm.currency,
        'SKU': elm.sku,
        'ReceiverName': elm.receiverName,
        'ReceiverCountry': elm.receiverCountry,
        'ReceiverAddress': elm.receiverAddress,
        'ReceiverCity': elm.receiverCity,
        'ReceiverState': elm.receiverState,
        'ReceiverPostalCode': elm.receiverPostalCode,
        'ReceiverContact': elm.receiverContact,
        'ReceiverPhoneNo': elm.receiverPhone,
        'ReceiverEmail': elm.receiverEmail
      };
      content.push(ent);
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(content);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public processExcelFile(evt: any, fName:any) {
    this.isBtnDisabled = true;
    let rows: any[] = [];
    //console.log(evt);
    //const selectedFile = evt.target.files[0];
    //console.log(selectedFile);
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(fName);

    /** This is lamda Funtion = anonymous function */
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      /** wb -- workBook of excel sheet */
      let wb = XLSX.read(binaryData, {type:'binary'});
      
      wb.SheetNames.forEach(sheet => {
        let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        rows = <any[]>data;
        console.log(wb);
        for(let idx:number = 0; idx < rows.length; ++idx) {
          this.xlsRows[idx] = new ExcelDataFormat(rows[idx]);
          this.accountCodeList.push(this.xlsRows[idx].accountCode);
        }
      });
    }

    /** This lamda Fn is invoked once excel file is loaded */
    fileReader.onloadend = (event) => {
      if(this.loggedInAcc.role == "Employee") {
        let uniq: Array<string> = this.getRidofDupElement(this.accountCodeList);
        for(let idx: number = 0; idx < uniq.length; ++idx) {
          this.rest.getCustomerInfo(uniq[idx]).subscribe(
            (data: Account) => {
              this.custInfoList.set(data.accountCode, data);
            },
            (error: any) => {alert("Invalid AccountCode ");},
            () => {
              this.isBtnDisabled = false;
            }
          );
        }
      } else {
        this.isBtnDisabled = false;
      }
    }

    fileReader.onerror = (event) => {
      this.isBtnDisabled = false;
      alert("Excel File is invalid: ");
    }
  }


}
