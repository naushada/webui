import { Injectable, OnDestroy, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

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
  private loggedInAcc!: Account;
  private subs!: Subscription;
  public xlsRows!: Array<ExcelDataFormat>;
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
  
  public onExcelSelect(evt: any) {
    this.processExcelFile(evt);
  }

  public processExcelFile(evt: any) {
    let rows: any[] = [];
    const selectedFile = evt.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);

    /** This is lamda Funtion = anonymous function */
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      /** wb -- workBook of excel sheet */
      let wb = XLSX.read(binaryData, {type:'binary'});
      
      wb.SheetNames.forEach(sheet => {
        let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        rows = <any[]>data;
        
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
