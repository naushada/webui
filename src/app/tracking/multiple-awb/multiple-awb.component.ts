import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Shipment, ShipmentList } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { MatTable } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SubSink } from 'subsink';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogSingleAwbComponent } from 'src/app/tracking/dialog-single-awb/dialog-single-awb.component';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-multiple-awb',
  templateUrl: './multiple-awb.component.html',
  styleUrls: ['./multiple-awb.component.scss']
})
export class MultipleAwbComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table!: MatTable<Shipment>;

  multipleAwbForm: FormGroup;
  acctInfo!: Account;
  shipmentInfoList!: ShipmentList;
  shipment:Array<Shipment> = [];
  displayResult: boolean = false;
  private mIsBtnDisabled: boolean;

  columnsName: Array<string> = ["shipmentNo", "event", "deliveryInformation", "view"];

  subsink = new SubSink();
  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub: PubsubService, public dialog: MatDialog) { 
    this.multipleAwbForm = this.fb.group({
      awbList: '',
      senderRefList: ''
    });

    /* subscribe for account info for logged in user*/
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});
    this.mIsBtnDisabled = false;
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
  }

  onMultipleAwb() {
    let awbNo: string = this.multipleAwbForm.value.awbList;
    let awbList = new Array<string>();

    let senderRef: string = this.multipleAwbForm.value.senderRefList;
    let senderRefList = new Array<string>();

    if(awbNo.length > 0) {
      awbNo = awbNo.trim();
      awbList = awbNo.split("\n");
      this.isBtnDisabled = true;
    } else if(senderRef.length > 0) {
      senderRef = senderRef.trim();
      senderRefList = senderRef.split("\n");
      this.isBtnDisabled = true;
    }

    if(awbNo.length > 0) {
      if(this.acctInfo.role == "Employee") {
        if(awbList[0].startsWith("5497") == true) {
          this.rest.getShipmentsByAwbNo(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                                this.multipleAwbForm.get('awbList')?.setValue("");
                                this.multipleAwbForm.get('senderRefList')?.setValue("");
                                //alert("Number of AWB Records are: " + this.shipmentInfoList.m_length );
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbList);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentsByAltRefNo(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                                this.multipleAwbForm.get('awbList')?.setValue("");
                                this.multipleAwbForm.get('senderRefList')?.setValue("");
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});

        }
      } else {
        let acCode: string = this.acctInfo.accountCode;
        if(awbList[0].startsWith("5497") == true) {
          this.rest.getShipmentsByAwbNo(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                                this.multipleAwbForm.get('awbList')?.setValue("");
                                this.multipleAwbForm.get('senderRefList')?.setValue("");
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              () => {
                                /** Publish the change */
                                
                              });
        } else {
          this.rest.getShipmentsByAltRefNo(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbList);
                              },
                              () => {});
        }
      }
    } else if(senderRef.length > 0) {
      if(this.acctInfo.role == "Employee") {
        this.rest.getShipmentsBySenderRefNo(senderRefList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              () => {
                                /** Publish the change */
                                

                              });

      } else {
        let acCode: string = this.acctInfo.accountCode;
        this.rest.getShipmentsBySenderRefNo(senderRefList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                this.isBtnDisabled = false;
                                this.displayResult = true;
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbList);
                              },
                              () => {});

      }
    }
  }

  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }

  openDialog(sh: Shipment): void {
    /** Publish the selected Shipment */
    this.pubsub.emit_shipment(sh);
    const dialogRef = this.dialog.open(DialogSingleAwbComponent , {
      panelClass: 'fullscreen-dialog',
      width: '100%'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pubsub.emit_shipment(new Shipment());
    });
  }

  /** Label A6 Generation  */
  Info = {
    title: 'A6 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A6 Label for Shipment',
    keywords: 'A6 Label',
  };

  A6LabelContentsBody:Array<object> = new Array<object>();

  buildA6ContentsBody() {
    this.A6LabelContentsBody.length = 0;
    this.shipmentInfoList.m_shipmentArray.forEach((elm:Shipment) => { 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 100, '*'],
            heights: ['auto', 'auto', 'auto', 20, 'auto'],
            body: [
              /*[ {image:"data:image/png;base64,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" , width:60, alignment: 'center', margin: [3, 3]}, {qr: 'To Be Updated', alignment: 'center', bold:false, fit:'50' }],*/
              [ {text: 'Date: ' + elm.activity[0].m_date + ' '+ elm.activity[0].m_time, fontSize:10}, {text: 'Destination: ' + elm.receiverCity +'\n' + 'Product Type: ' + elm.service, bold: true}],
              [ {text: 'Account Number: '+ elm.accountCode, fontSize:10}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false, fontSize: 10 }, ''],
              [ { text: 'From:\n' + elm.name +'\n'+ 'Mobile: '+ elm.contact + '\n' + 'Altername Mobile: '+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false, fontSize:10 }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address: '+elm.receiverAddress+'\n'+'City: '+ elm.receiverCity+ '\n'+'Mobile: '+elm.receiverPhone +'\n' + 'Alternate Mobile: '+elm.receiverContact +'\n'+'Country:'+elm.receiverCountry, fontSize: 10}],
              [ {text: 'Description: ' + elm.description, fontSize:10}, {image: this.textToBase64Barcode(elm.altRefNo, 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency + ' ' + elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
          /*
          pageBreakAfter: (currentNode:any, followingNodesOnPage:any, nodesOnNextPage:any, previousNodesOnPage:any) => {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
         }*/
        }
      ];

      this.A6LabelContentsBody.push(ent);
    });
  }

  A4LabelContentsBody:Array<object> = new Array<object>();

  buildA4ContentsBody() {
    this.A4LabelContentsBody.length = 0;
    this.shipmentInfoList.m_shipmentArray.forEach((elm: Shipment) => { 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 200, '*'],
            body: [
              /*[ {image:"data:image/png;base64,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", width:60, margin:[3,3], alignment: 'center'}, {qr: 'To Be Updated', alignment: 'center', bold:false, fit:'50' }],*/
              [ {text: 'Date:' + elm.activity[0].m_date + ' '+ elm.activity[0].m_time}, {text: 'Destination:' + elm.receiverCity +'\n' + 'Product Type:' + elm.service, bold: true}],
              [ {text: 'Account Number:'+ elm.accountCode}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false }, ''],
              [ { text: 'From:\n' + elm.name +'\n'+ 'Mobile: '+ elm.contact + '\n' + 'Alternate Mobile: '+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address: '+elm.receiverAddress+'\n'+'City: '+ elm.receiverCity+ '\n'+'Mobile: '+elm.receiverPhone +'\n' + 'Altername Mobile: '+elm.receiverContact+'\n'+'Country: '+elm.receiverCountry}],
              [ {text: 'Description:' + elm.description}, {image: this.textToBase64Barcode(elm.altRefNo , 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency +' '+elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
        }
      ];

      this.A4LabelContentsBody.push(ent);
    });
  }

  docDefinitionA6 = {
    info: this.Info,
    pageSize: "A6",
    pageMargins: 5,
    content: this.A6LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      defaultStyle: {
        fontSize: 8,
      }
    }
  };

  docDefinitionA4 = {
    info: this.Info,
    pageMargins: 10,
    content: this.A4LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      rH: {
        height: 100,
        fontSize: 10
      }
    }
  };

  textToBase64Barcode(text: string, ht:number, fSize: number = 15) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
  }

  generatePdf(pgType: string) {
    if('A6' == pgType) {
      this.buildA6ContentsBody();
      pdfMake.createPdf(this.docDefinitionA6).download( pgType + "-label");
    } else {
      this.buildA4ContentsBody();
      pdfMake.createPdf(this.docDefinitionA4).download( pgType + "-label");
    }
  }

}
