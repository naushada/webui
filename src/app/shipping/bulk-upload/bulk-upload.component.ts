import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { XlsServiceService } from 'src/app/shared/xls-service.service';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  private subs!: Subscription;
  public xlsUploadForm: FormGroup;
  private loggedInUser!: Account;

  constructor(private fb: FormBuilder, private xls: XlsServiceService, private rest: RestApiService, private pubsub: PubsubService) {
    this.xlsUploadForm = fb.group({
      xlsUpload: ''
    });
   }

  ngOnInit(): void {
    this.subs = this.pubsub.onAccount.subscribe((acc: Account) => {this.loggedInUser = new Account(acc);});
  }

  get isBtnDisabled(): boolean {
    return(this.xls.isBtnDisabled);
  }

  onXLSUpload() {
    
    let listOfObj = new Array<string>();
    for(let row of this.xls.xlsRows) {
      let req:string = this.fillShipmentInfo(row);
      listOfObj.push(req);
    }

    let arrStr = JSON.stringify(listOfObj);
    this.rest.createBulkShipment(arrStr).subscribe((rsp:any) => { 
      let record: any; 
      let jObj = JSON.stringify(rsp);
      record = JSON.parse(jObj); alert("Shipments Create are: " + record.createdShipments);
    },
    (error: any) => {},
    () => {});

    this.xls.custInfoList.clear();
  }

  fillShipmentInfo(from: any): string {
    let acc: string = from.accountCode;
    let customerInfo:Account = new Account();
    
    for (let [key, value] of this.xls.custInfoList) {
      if(key == acc) {
        customerInfo = value;
        break;
      }
    }

    if(customerInfo) {
      let shInfo: FormGroup = this.fb.group({
          activity: this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'), event: "Document Created", 
                                  time:new Date().getHours()+':'+new Date().getMinutes(), notes:'Document Ccreated', driver:'', 
                                  updatedBy:this.loggedInUser.name, eventLocation:'Riyadh'}]),
          createdOn:formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          createdBy: this.loggedInUser.name,
          shipmentNo:'[System Generated]',
          autogenerate:true,
          altRefNo: from.altRefNo,
          /** Sender Informat */
          referenceNo: from.referenceNo,
          accountCode: from.accountCode,
          companyName: customerInfo.companyName,
          name: from.name && from.name || customerInfo.name,
          country: customerInfo.country,
          address: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.postalCode,
          contact: customerInfo.contact,
          phone: from.phone,
          email: customerInfo.email,
          recvCountryTaxId: from.recvCountryTaxId,
          /** Shipment Information */
          service: 'Non Document',
          noOfItems: '1',
          description: from.description,
          goodsValue: from.goodsValue,
          customValue: from.customValue,
          weight: from.weight,
          weightUnit: 'KG',
          cubicWeight: from.cubicWeight,
          codAmount: from.codAmount,
          vat: from.vat,
          currency: from.currency,
          sku: from.sku,

          /** Receiver Information */
          receiverName: from.receiverName,
          receiverCountry: from.receiverCountry && from.receiverCountry || "Saudi Arabia",
          receiverAddress: from.receiverAddress,
          receiverCity: from.receiverCity,
          receiverState: from.receiverState,
          receiverPostalCode: from.receiverPostalCode,
          receiverContact: from.receiverContact,
          receiverPhone: from.receiverPhone,
          receiverEmail: from.receiverEmail
        });

        return(shInfo.value);
      }
      return("");
    }
  

  onXlsSelect(event: any) {
    this.xls.onExcelSelect(event);
  }
}
